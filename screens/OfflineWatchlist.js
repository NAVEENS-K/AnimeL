// screens/OfflineWatchlist.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OfflineWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newAnime, setNewAnime] = useState('');
  const [newNote, setNewNote] = useState('');

  // Fetch saved watchlist from AsyncStorage
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem('watchlist');
        if (storedWatchlist) {
          setWatchlist(JSON.parse(storedWatchlist));
        }
      } catch (error) {
        console.error('Error loading watchlist', error);
      }
    };
    loadWatchlist();
  }, []);

  const addToWatchlist = async () => {
    if (newAnime.trim() === '') {
      Alert.alert('Error', 'Please enter an anime name.');
      return;
    }

    const newAnimeItem = { id: Date.now(), name: newAnime, note: newNote };
    const updatedWatchlist = [...watchlist, newAnimeItem];

    try {
      await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
      setNewAnime('');
      setNewNote('');
    } catch (error) {
      console.error('Error saving to watchlist', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.animeName}>{item.name}</Text>
      <Text style={styles.note}>{item.note || 'No notes for this anime.'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offline Watchlist</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter anime name"
        value={newAnime}
        onChangeText={setNewAnime}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a note (optional)"
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Add to Watchlist" onPress={addToWatchlist} />
      <FlatList
        data={watchlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.watchlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { padding: 10, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  watchlist: { paddingTop: 10 },
  card: { padding: 15, backgroundColor: '#f3f4f6', marginBottom: 10, borderRadius: 8 },
  animeName: { fontSize: 16, fontWeight: 'bold' },
  note: { fontSize: 14, color: '#6b7280' },
});

export default OfflineWatchlist;
