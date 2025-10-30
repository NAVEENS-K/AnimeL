import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Polls = () => {
  const [votes, setVotes] = useState({ epic: 0, average: 0, bad: 0 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗳️ Rate This Episode</Text>

      <View style={styles.voteButtons}>
        <Button title="🔥 Epic" color="#4caf50" onPress={() => setVotes({ ...votes, epic: votes.epic + 1 })} />
        <Button title="😐 Average" color="#ff9800" onPress={() => setVotes({ ...votes, average: votes.average + 1 })} />
        <Button title="👎 Bad" color="#f44336" onPress={() => setVotes({ ...votes, bad: votes.bad + 1 })} />
      </View>

      <Text style={styles.resultsTitle}>Live Results</Text>
      <View style={styles.results}>
        <Text>🔥 Epic: {votes.epic}</Text>
        <Text>😐 Average: {votes.average}</Text>
        <Text>👎 Bad: {votes.bad}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  voteButtons: { gap: 10, marginBottom: 30 },
  resultsTitle: { fontSize: 18, fontWeight: '500', marginBottom: 10 },
  results: { gap: 6 },
});

export default Polls;
