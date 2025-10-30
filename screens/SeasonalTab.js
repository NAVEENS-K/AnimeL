import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import animeData from '../data/animeData';
import { ThemeContext } from '../context/ThemeContext'; // 🌓 Dark mode support

const years = Array.from({ length: 107 }, (_, i) => (2025 - i).toString());
const seasons = ['winter', 'spring', 'summer', 'fall'];

const SeasonalTab = () => {
  const { darkMode } = useContext(ThemeContext); // 🌓
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedSeason, setSelectedSeason] = useState('winter');
  const [sortBy, setSortBy] = useState('members');
  const navigation = useNavigation();

  useEffect(() => {
    filterAndSortAnime();
  }, [selectedYear, selectedSeason, sortBy]);

  const filterAndSortAnime = () => {
    const filtered = animeData.filter(
      (anime) =>
        anime.season?.toLowerCase() === selectedSeason.toLowerCase() &&
        anime.year?.toString() === selectedYear
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'members') return b.members - a.members;
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'start_date') return new Date(b.aired.from) - new Date(a.aired.from);
      return 0;
    });

    setFilteredAnime(sorted);
  };

  const renderAnimeCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, darkMode && { backgroundColor: '#1e293b' }]}
      onPress={() => navigation.navigate('AnimeDetail', { animeId: item.mal_id })}
    >
      <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, darkMode && { color: '#fff' }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.meta, darkMode && { color: '#cbd5e1' }]}>
          ⭐ {item.score} | 👥 {item.members.toLocaleString()}
        </Text>

        <TouchableOpacity
          style={[styles.addButton, darkMode && { backgroundColor: '#3b82f6' }]}
          onPress={() =>
            navigation.navigate('AddListScreen', { animeId: item.mal_id, anime: item })
          }
        >
          <Text style={styles.addButtonText}>+ MyAnimeList</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, darkMode && { backgroundColor: '#0f172a' }]}
    >
      <View style={[styles.filterContainer, darkMode && { backgroundColor: '#1e293b' }]}>
        <View style={styles.pickerWrapper}>
          <Text style={[styles.filterLabel, darkMode && { color: '#fff' }]}>Year</Text>
          <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={(value) => setSelectedYear(value)}
            dropdownIconColor={darkMode ? '#fff' : '#000'}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={[styles.filterLabel, darkMode && { color: '#fff' }]}>Season</Text>
          <Picker
            selectedValue={selectedSeason}
            style={styles.picker}
            onValueChange={(value) => setSelectedSeason(value)}
            dropdownIconColor={darkMode ? '#fff' : '#000'}
          >
            {seasons.map((season) => (
              <Picker.Item
                key={season}
                label={season.charAt(0).toUpperCase() + season.slice(1)}
                value={season}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={[styles.filterLabel, darkMode && { color: '#fff' }]}>Sort by</Text>
          <Picker
            selectedValue={sortBy}
            style={styles.picker}
            onValueChange={(value) => setSortBy(value)}
            dropdownIconColor={darkMode ? '#fff' : '#000'}
          >
            <Picker.Item label="Members" value="members" />
            <Picker.Item label="Rating" value="score" />
            <Picker.Item label="Start Date" value="start_date" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredAnime}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={renderAnimeCard}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  filterContainer: {
    padding: 10,
    backgroundColor: '#e9eff9',
  },
  pickerWrapper: {
    marginBottom: 10,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
    color: '#1f2937',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 140,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: '#111',
  },
  meta: {
    color: '#555',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#2e51a2',
    padding: 6,
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SeasonalTab;
