import AsyncStorage from '@react-native-async-storage/async-storage';

export const getReviews = async (animeId) => {
  const json = await AsyncStorage.getItem(`REVIEWS_${animeId}`);
  return json ? JSON.parse(json) : [];
};

export const addReview = async (animeId, review) => {
  const current = await getReviews(animeId);
  const updated = [...current, review];
  await AsyncStorage.setItem(`REVIEWS_${animeId}`, JSON.stringify(updated));
};
