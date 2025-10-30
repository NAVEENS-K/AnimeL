import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import clubDiscussionData from '../data/clubdiscussionData';
import { ThemeContext } from '../context/ThemeContext';

export default function Discussion() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedIds, setJoinedIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    loadJoinedClubs();
  }, []);

  const loadJoinedClubs = async () => {
    const stored = await AsyncStorage.getItem('joinedClubs');
    const ids = stored ? JSON.parse(stored) : [];
    setJoinedIds(ids);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJoinedClubs();
    setRefreshing(false);
  };

  const filtered = clubDiscussionData.filter((club) =>
    (club?.clubName ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const joinedClubs = filtered.filter((club) => joinedIds.includes(club.clubId));
  const unjoinedClubs = filtered.filter((club) => !joinedIds.includes(club.clubId));

  const themeStyles = darkMode ? darkStyles : lightStyles;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ClubDetail', { clubId: item.clubId })}
      style={[themeStyles.clubCard]}
    >
      <Image source={{ uri: item.image }} style={styles.clubImage} />
      <View style={styles.clubInfo}>
        <Text style={themeStyles.clubName}>{item.clubName}</Text>
        <Text style={themeStyles.clubTheme}>{item.clubTheme}</Text>
        <Text style={themeStyles.clubMembers}>👥 {item.membersCount}k members</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[themeStyles.container]}>
      <TextInput
        style={themeStyles.searchBar}
        placeholder="Search clubs..."
        placeholderTextColor={darkMode ? '#aaa' : '#6b7280'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={themeStyles.sectionTitle}>Joined Clubs</Text>
      <FlatList
        data={joinedClubs}
        keyExtractor={(item) => item.clubId.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={themeStyles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Text style={themeStyles.sectionTitle}>Recently Active Clubs</Text>
      <FlatList
        data={unjoinedClubs}
        keyExtractor={(item) => item.clubId.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={themeStyles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

// Shared styles
const styles = StyleSheet.create({
  clubImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  clubInfo: {
    flex: 1,
  },
});

// Light theme styles
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  clubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  clubName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  clubTheme: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  clubMembers: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 6,
  },
});

// Dark theme styles
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
    color: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f3f4f6',
    marginBottom: 10,
  },
  clubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 8,
  },
  clubName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  clubTheme: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 2,
  },
  clubMembers: {
    fontSize: 12,
    color: '#d1d5db',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 6,
  },
});
