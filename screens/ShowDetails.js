import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressTracker from '../components/ProgressTracker';

const ShowDetails = ({ route }) => {
  const { title, totalEpisodes } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ProgressTracker totalEpisodes={totalEpisodes} initialWatched={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ShowDetails;
