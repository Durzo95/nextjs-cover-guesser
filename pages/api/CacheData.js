const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
    try {
        if (req.query.cache_token !== `${process.env.cache_token}`) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        // get the data from the IGDB api
        const result = await getGameData();
        // save the data to a json file
        saveData(result);
        // Get the count of the games in the response
        return res.status(200).json({ staus: "success", message: `Saved ${result.length} games to cache` });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

// function to call the GamesData api
async function getGameData() {
    let data = await getIGDB();
    data = processData(data);
    return data;
}

// function to save the response from the IGDB api to a json file
async function saveData(data) {
    const filePath = path.join(process.cwd(), 'data', 'games.json');
    fs.writeFileSync(filePath, JSON.stringify(data));
}

async function getIGDB() {
    const queryBody = `fields name,cover.url, cover.height, cover.width, total_rating_count, rating, summary,first_release_date, franchises.name, genres.name;
                      where total_rating_count != null & cover != null;  
                      sort total_rating_count desc;
                      limit 50;`;
    const apiResponse = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': `${process.env.client_id}`,
            Authorization: `Bearer ${process.env.access_token}`,
            'Content-Type': 'text/plain'
        },
        body: queryBody
    });

    let data = await apiResponse.json();

    return data;
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