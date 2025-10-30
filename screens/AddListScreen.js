import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { AnimeListContext } from '../context/AnimeListContext';
import { ThemeContext } from '../context/ThemeContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const AddListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const anime = route.params?.anime;
  const isEditing = route.params?.edit;
  const existingEntry = route.params?.existingEntry;

  const { addAnime, updateAnime, removeAnime, animeList } = useContext(AnimeListContext);
  const { darkMode } = useContext(ThemeContext);

  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('Watching');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    if (!anime || !anime.mal_id) {
      Alert.alert('Error', 'No anime data found. Please go back and try again.');
      return;
    }

    const existing = isEditing
      ? existingEntry
      : animeList.find((item) => item.anime.mal_id === anime.mal_id);

    if (existing) {
      setEpisodesWatched(existing.episodesWatched ?? 0);
      setScore(existing.score ?? 0);
      setStatus(existing.status ?? 'Watching');
      setStartDate(existing.startDate ? new Date(existing.startDate) : new Date());
      setEndDate(existing.endDate ? new Date(existing.endDate) : new Date());
    }
  }, [anime]);

  const handleAddToList = async () => {
    if (!anime || !anime.mal_id) {
      Alert.alert('Error', 'Anime data is invalid.');
      return;
    }

    const animeEntry = {
      anime,
      status,
      episodesWatched,
      score,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      createdAt: isEditing ? existingEntry.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (isEditing) {
        updateAnime(animeEntry);
      } else {
        addAnime(animeEntry);
      }

      const existing = await AsyncStorage.getItem('myAnimeList');
      const list = existing ? JSON.parse(existing) : [];
      const updatedList = list.filter(item => item.anime?.mal_id !== anime.mal_id);
      updatedList.push(animeEntry);

      await AsyncStorage.setItem('myAnimeList', JSON.stringify(updatedList));

      Platform.OS === 'android'
        ? ToastAndroid.show('Saved successfully!', ToastAndroid.SHORT)
        : Alert.alert('Success', 'Saved successfully!');

      navigation.goBack();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleRemoveFromList = async () => {
    try {
      removeAnime(anime.mal_id);
      const existing = await AsyncStorage.getItem('myAnimeList');
      const list = existing ? JSON.parse(existing) : [];
      const updatedList = list.filter(item => item.anime?.mal_id !== anime.mal_id);
      await AsyncStorage.setItem('myAnimeList', JSON.stringify(updatedList));

      Platform.OS === 'android'
        ? ToastAndroid.show('Removed successfully!', ToastAndroid.SHORT)
        : Alert.alert('Success', 'Removed successfully!');

      navigation.goBack();
    } catch (error) {
      console.error('Error removing:', error);
    }
  };

  const isInList = animeList.some(item => item.anime?.mal_id === anime.mal_id);

  const styles = getStyles(darkMode);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Icon name="arrow-back" size={22} color={darkMode ? '#fff' : '#007aff'} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Add to My Anime List</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Anime Title:</Text>
        <Text style={styles.value}>{anime.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={setStatus} dropdownIconColor={darkMode ? '#fff' : undefined}>
            <Picker.Item label="Watching" value="Watching" />
            <Picker.Item label="Completed" value="Completed" />
            <Picker.Item label="On Hold" value="On Hold" />
            <Picker.Item label="Dropped" value="Dropped" />
            <Picker.Item label="Plan to Watch" value="Plan to Watch" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Score: {score}/10</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={score}
          onValueChange={setScore}
          minimumTrackTintColor="#007aff"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#007aff"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Episodes Watched: {episodesWatched} / {anime.episodes || 24}
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={anime.episodes || 24}
          step={1}
          value={episodesWatched}
          onValueChange={setEpisodesWatched}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#1FB28A"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Start Date</Text>
        <Button title={startDate.toDateString()} onPress={() => setShowStartPicker(true)} />
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>End Date</Text>
        <Button title={endDate.toDateString()} onPress={() => setShowEndPicker(true)} />
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}
      </View>

      <View style={styles.submitContainer}>
        <Button title="Save to My Anime" onPress={handleAddToList} color="#007aff" />
        {isInList && (
          <View style={{ marginTop: 10}}>
            <Button
              title="Remove from My Anime"
              onPress={handleRemoveFromList}
              color="#ff3b30"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default AddListScreen;
const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: darkMode ? '#121212' : '#fff',
    },
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backText: {
      fontSize: 16,
      color: darkMode ? '#fff' : '#007aff',
      marginLeft: 6,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 25,
      textAlign: 'center',
      color: darkMode ? '#fff' : '#000',
    },
    section: {
      marginBottom: 20,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: darkMode ? '#ccc' : '#000',
    },
    value: {
      fontSize: 16,
      marginBottom: 10,
      color: darkMode ? '#fff' : '#000',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: darkMode ? '#1f1f1f' : '#fff',
    },
    submitContainer: {
      marginTop: 30,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
  });

