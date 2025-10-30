// screens/GenreAnimeList.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const GenreAnimeList = ({ route, navigation }) => {
  const { genreId, genreName } = route.params;
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeByGenre = async () => {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=score&sort=desc`);
        setAnimeList(res.data.data);
      } catch (error) {
        console.error('Error fetching anime by genre:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeByGenre();
  }, [genreId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AnimeDetail', { animeId: item.mal_id })}
    >
      <Image
        source={{ uri: item.images.jpg.image_url }}
        style={styles.poster}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.score}>⭐ {item.score ?? 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading {genreName} anime...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{genreName} Anime</Text>
      <FlatList
        data={animeList}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#1f2937',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  score: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default GenreAnimeList;
