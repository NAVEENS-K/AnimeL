
// animeData.js

const categories = ['popular', 'top_rated', 'upcoming', 'now_airing', 'trending'];

const getRandomCategory = (i) => categories[i % categories.length];

const animeData = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  title: `Anime Title ${index + 1}`,
  image_url: `https://picsum.photos/seed/anime${index + 1}/200/300`,
  genres: ['Action', 'Adventure', 'Fantasy'].slice(0, Math.floor(Math.random() * 3) + 1),
  episodes: Math.floor(Math.random() * 24) + 1,
  score: (Math.random() * 3 + 7).toFixed(2),
  members: Math.floor(Math.random() * 1000000),
  year: 2020 + (index % 6),
  season: ['winter', 'spring', 'summer', 'fall'][index % 4],
  aired: {
    from: `202${index % 6}-01-01T00:00:00+00:00`,
  },
  category: getRandomCategory(index),
}));

export default animeData;
