import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressTracker = ({ totalEpisodes = 12, initialWatched = 0 }) => {
  const [watched, setWatched] = useState(initialWatched);

  const increment = () => {
    if (watched < totalEpisodes) setWatched(watched + 1);
  };

  const decrement = () => {
    if (watched > 0) setWatched(watched - 1);
  };

  const progress = watched / totalEpisodes;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Episodes Watched: {watched} / {totalEpisodes}</Text>
      <Progress.Bar progress={progress} width={null} color="#4caf50" />
      <View style={styles.buttonRow}>
        <Button title="-" onPress={decrement} />
        <Button title="+" onPress={increment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});

export default ProgressTracker;
