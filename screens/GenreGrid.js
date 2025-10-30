// screens/GenreGrid.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const GenreGrid = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('https://api.jikan.moe/v4/genres/anime');
        const limitedGenres = res.data.data.slice(0, 20); // top 20 genres
        setGenres(limitedGenres);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('GenreAnimeList', { genreId: item.mal_id, genreName: item.name })}
      style={styles.card}
    >
      <ImageBackground
        source={{ uri: `https://source.unsplash.com/600x400/?anime,${item.name}` }}
        style={styles.image}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.genreText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={genres}
      keyExtractor={(item) => item.mal_id.toString()}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { flex: 1, margin: 8, height: 150 },
  image: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 6,
  },
  genreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GenreGrid;
