// Path: pages\api\GamesData
export default async function handler(req, res) {
    res.status(200).json(process.env.VERCEL_URL);
}