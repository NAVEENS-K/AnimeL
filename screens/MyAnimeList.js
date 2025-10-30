import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AnimeListContext } from '../context/AnimeListContext';
import { ThemeContext } from '../context/ThemeContext';

const MyAnimeList = ({ status = 'all', navigation }) => {
  const { animeList } = useContext(AnimeListContext);
  const { darkMode } = useContext(ThemeContext);
  const [filteredList, setFilteredList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const filterAndSortList = useCallback(() => {
    let list = animeList.filter(item => item?.anime?.mal_id);

    if (status.toLowerCase() !== 'all') {
      list = list.filter(item => item.status?.toLowerCase() === status.toLowerCase());
    }

    list = list.sort((a, b) =>
      (a.anime?.title ?? '').localeCompare(b.anime?.title ?? '')
    );

    setFilteredList(list);
  }, [animeList, status]);

  useEffect(() => {
    filterAndSortList();
  }, [filterAndSortList]);

  const onRefresh = () => {
    setRefreshing(true);
    filterAndSortList();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, darkMode && styles.cardDark]}
      onPress={() =>
        navigation.navigate('AddListScreen', {
          anime: item.anime,
          edit: true,
          existingEntry: item,
        })
      }
    >
      <Image
        source={{ uri: item.anime?.images?.jpg?.image_url }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={[styles.title, darkMode && styles.textDark]}>{item.anime?.title}</Text>
        <Text style={[styles.info, darkMode && styles.textDark]}>
          Episodes Watched: {item.episodesWatched} / {item.anime?.episodes ?? '??'}
        </Text>
        <Text style={[styles.info, darkMode && styles.textDark]}>
          Score: {item.score}/10
        </Text>
        <Text style={[styles.info, darkMode && styles.textDark]}>
          Status: {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{ backgroundColor: darkMode ? '#111827' : '#fff' }}
      data={filteredList}
      keyExtractor={(item, index) => `${item.anime?.mal_id || index}`}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, darkMode && styles.textDark]}>No anime found.</Text>
        </View>
      }
    />
  );
};

export default MyAnimeList;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 6,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1e40af',
  },
  info: {
    fontSize: 13,
    color: '#374151',
  },
  textDark: {
    color: '#e5e7eb',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
  },
});
