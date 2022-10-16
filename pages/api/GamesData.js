// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  const api_res = fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': `${process.env.client_id}`,
      Authorization: `Bearer ${process.env.access_token}`,
      'Content-Type': 'text/plain'
    },
    body: 'fields name,cover.url, cover.height, cover.width, total_rating_count, rating, summary;\nwhere total_rating_count != null & cover != null;  \nsort total_rating_count desc;'
  });

  api_res.then((response) => {
    return response.json();
  }).then((data) => {
    // select a random item from the array
    const random_item = data[Math.floor(Math.random() * data.length)];
    // Convert the cover image url to 1080p
    random_item.cover.url = random_item.cover.url.replace('t_thumb', 't_1080p');
    res.status(200).json(random_item);
  });
}
