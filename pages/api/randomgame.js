// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// this is the api route that is called by the Cover component
async function getRandomGameData() {
  // get the data from the games api endpoint
  const baseUrl = getAbsoluteUrl();
  const response = await fetch(`${baseUrl}/api/games?server_token=${process.env.server_token}`);
  const data = await response.json();
  // Get a random game from the array
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomGameData = data[randomIndex];

  return randomGameData;
}

function getAbsoluteUrl() {
  if (process.env.VERCEL_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return process.env.VERCEL_URL;
}

// Path: pages\api\GamesData
export default async function handler(req, res) {
  const jsonData = await getRandomGameData();
  res.status(200).json(jsonData);
}
