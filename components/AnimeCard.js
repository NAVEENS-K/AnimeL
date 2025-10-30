import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimeCard = ({ anime }) => {
  const saveToWatchlist = async () => {
    try {
      const watchlistData = await AsyncStorage.getItem('@watchlist');
      const watchlist = watchlistData ? JSON.parse(watchlistData) : [];

      const alreadyExists = watchlist.some(item => item.mal_id === anime.mal_id);
      if (!alreadyExists) {
        const newAnime = {
          mal_id: anime.mal_id,
          title: anime.title,
          watchedEpisodes: 0,
          totalEpisodes: anime.episodes || 0,
          genres: anime.genres || [],
        };

        watchlist.push(newAnime);
        await AsyncStorage.setItem('@watchlist', JSON.stringify(watchlist));
      }
    } catch (err) {
      console.error('Error saving to watchlist:', err);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: anime.image_url }} style={styles.image} />
      <Text style={styles.title}>{anime.title}</Text>
      <Text style={styles.description}>{anime.synopsis}</Text>

      <TouchableOpacity onPress={saveToWatchlist} style={styles.button}>
        <Text style={styles.buttonText}>Add to Watchlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16, padding: 16, borderRadius: 8, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 14, color: '#555', marginBottom: 8 },
  button: { backgroundColor: '#FF6384', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default AnimeCard;
