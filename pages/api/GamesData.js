// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// this is the api route that is called by the Cover component
export async function getGameData() {
  const queryBody = `fields name,cover.url, cover.height, cover.width, total_rating_count, rating, summary, franchises.name;
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
  data = processData(data);
  console.log(data)


  return data;
}

function processData(data) {
  // select a random item from the array
  const randomGame = data[Math.floor(Math.random() * data.length)];
  // Convert the cover image url to 1080p
  randomGame.cover.url = randomGame.cover.url.replace('t_thumb', 't_1080p');
  // add https to the url
  randomGame.cover.url = 'https:' + randomGame.cover.url;
  // resize the image to fit the screen
  [randomGame.cover.width, randomGame.cover.height] = resizeDimensions(randomGame.cover.width, randomGame.cover.height);

  return randomGame;
}

function resizeDimensions(width, height) {
  // Get the ratio to keep the image proportions
  const ratio = width / height;
  // Cover can not be more than 608 pixels wide
  const newWidth = 608;
  const newHeight = newWidth / ratio;

  return [newWidth, newHeight];
}

// Path: pages\api\GamesData
export default async function handler(req, res) {
  const jsonData = await getGameData();
  res.status(200).json(jsonData);
}
