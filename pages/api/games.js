
export default async function handler(req, res) {
    try {
        if (req.query.server_token !== process.env.server_token) {
            return res.status(403).send('Unauthorized');
        }
        // get the data from the IGDB api
        let result = await getGameData();
        // set the cache control header to 1 day
        // this will cache the data for 1 day or until the server is redeployed
        res.setHeader('Cache-Control', 's-maxage=86400');
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

// function to call the GamesData api
async function getGameData() {
    let data = await getIGDB();
    data = processData(data);
    return data;
}


async function getIGDB(retries = 3) {
    const accessToken = process.env.access_token || await generateAccessToken();
    process.env.access_token = accessToken;

    const queryBody = `fields name,cover.url, cover.height, cover.width, total_rating_count, rating, summary,first_release_date, franchises.name, genres.name;
                      where total_rating_count != null & cover != null;  
                      sort total_rating_count desc;
                      limit 50;`;
    const apiResponse = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': `${process.env.client_id}`,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'text/plain'
        },
        body: queryBody
    });

    // This avoids an infinite loop if the access token is expired and fails to renew
    if (apiResponse.status === 401) {
        if (retries > 0) {
            process.env.access_token = await generateAccessToken();
            data = await getIGDB(retries - 1);
        } else {
            throw new Error('Access token is expired and failed to renew after maximum retry limit');
        }
    }

    let data = await apiResponse.json();

    return data;
}

async function generateAccessToken() {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            grant_type: 'client_credentials',
        }),
    });
    const data = await response.json();
    console.log(data)
    return data.access_token;
}

function processData(data) {
    // loop through the array of data and process it
    const processedData = data.map(game => {
        // Convert the cover image url to 1080p
        game.cover.url = game.cover.url.replace('t_thumb', 't_1080p');
        // add https to the url
        game.cover.url = 'https:' + game.cover.url;
        // resize the image to fit the screen
        [game.cover.width, game.cover.height] = resizeDimensions(game.cover.width, game.cover.height);
        // Convert the summary to plain text
        game.summary = game.summary.replace(/(<([^>]+)>)/gi, '');
        // get the first 100 characters of the summary
        // remove any mention of the game name
        // add trailing ellipsis
        game.summary = game.summary.substring(0, 100).replace(game.name, '[REDACTED]') + '...';
        // Convert the release date to readable format, for example September 30th, 2021
        game.first_release_date = new Date(game.first_release_date * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        // Convert the rating to a percentage
        game.rating = `${Math.round(game.rating)}%`;
        // Convert the genres to a string
        game.genres = game.genres.map(genre => genre.name).join(', ');

        return game;
    });
    return processedData;
}

function resizeDimensions(width, height) {
    // Get the ratio to keep the image proportions
    const ratio = width / height;
    // Cover can not be more than 608 pixels wide
    const newWidth = 608;
    const newHeight = newWidth / ratio;

    return [newWidth, newHeight];
}