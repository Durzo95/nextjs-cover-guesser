// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');
const path = require('path');

// this is the api route that is called by the Cover component
export async function getGameData() {
  // get the data from the games.json file in the data folder
  const filePath = path.join(process.cwd(), 'data', 'games.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  // Get a random game from the array
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomGameData = data[randomIndex];

  return randomGameData;
}


// Path: pages\api\GamesData
export default async function handler(req, res) {
  const jsonData = await getGameData();
  res.status(200).json(jsonData);
}
