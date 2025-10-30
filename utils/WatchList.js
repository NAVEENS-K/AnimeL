// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WATCHLIST_KEY = 'WATCHLIST';

// export const addToWatchlist = async (anime) => {
//   try {
//     const json = await AsyncStorage.getItem(WATCHLIST_KEY);
//     const list = json ? JSON.parse(json) : [];
//     const exists = list.find((item) => item.mal_id === anime.mal_id);
//     if (!exists) {
//       list.push(anime);
//       await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
//     }
//   } catch (err) {
//     console.error('Add to Watchlist Error:', err);
//   }
// };

// export const getWatchlist = async () => {
//   try {
//     const json = await AsyncStorage.getItem(WATCHLIST_KEY);
//     return json ? JSON.parse(json) : [];
//   } catch (err) {
//     console.error('Get Watchlist Error:', err);
//     return [];
//   }
// };

// export const isInWatchlist = async (animeId) => {
//   try {
//     const json = await AsyncStorage.getItem(WATCHLIST_KEY);
//     const list = json ? JSON.parse(json) : [];
//     return list.some((item) => item.mal_id === animeId);
//   } catch (err) {
//     console.error('Check Watchlist Error:', err);
//     return false;
//   }
// };






import AsyncStorage from '@react-native-async-storage/async-storage';

const WATCHLIST_KEY = 'WATCHLIST';

export const getWatchlist = async () => {
  const json = await AsyncStorage.getItem(WATCHLIST_KEY);
  return json ? JSON.parse(json) : [];
};

export const addToWatchlist = async (anime) => {
  const current = await getWatchlist();
  const exists = current.some((item) => item.mal_id === anime.mal_id);
  if (!exists) {
    const updated = [...current, anime];
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  }
};

export const removeFromWatchlist = async (id) => {
  const current = await getWatchlist();
  const updated = current.filter((item) => item.mal_id !== id);
  await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
};

export const isInWatchlist = async (id) => {
  const current = await getWatchlist();
  return current.some((item) => item.mal_id === id);
};
