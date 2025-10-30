import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AnimeListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{item.anime.title}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Episodes Watched: {item.episodesWatched}</Text>
      <Text>Start Date: {item.startDate ? new Date(item.startDate).toDateString() : 'N/A'}</Text>
      <Text>End Date: {item.endDate ? new Date(item.endDate).toDateString() : 'N/A'}</Text>
    </TouchableOpacity>
  );
};

export default AnimeListItem;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});