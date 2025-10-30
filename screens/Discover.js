import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import animeData from '../data/animeData';
import { ThemeContext } from '../context/ThemeContext';

// Define sample categories
const categories = [
  { key: 'action', title: 'Action' },
  { key: 'comedy', title: 'Comedy' },
  { key: 'sci-fi', title: 'Sci-Fi' },
  { key: 'fantasy', title: 'Fantasy' },
  { key: 'drama', title: 'Drama' },
];

const Discover = () => {
  const navigation = useNavigation();
  const { darkMode } = useContext(ThemeContext);

  const themeStyles = getStyles(darkMode);

  const getCategoryData = (categoryKey) => {
    return animeData.filter((anime) =>
      anime.category?.toLowerCase() === categoryKey
    );
  };

  const renderAnimeCard = ({ item, index }) => {
    if (!item || !item.title) return null;
    const imageUrl = item?.images?.jpg?.image_url || '';

    return (
      <TouchableOpacity
        style={themeStyles.card}
        onPress={() =>
          navigation.navigate('AnimeDetail', {
            animeId: item.mal_id ?? index,
            anime: item,
          })
        }
      >
        <Image source={{ uri: imageUrl }} style={themeStyles.image} />
        <Text style={themeStyles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={themeStyles.meta}>⭐ {item.score ?? 'N/A'}</Text>
        <Text style={themeStyles.meta}>👥 {item.members?.toLocaleString() ?? '0'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={themeStyles.container}>
      {categories.map((category) => {
        const data = getCategoryData(category.key);
        if (data.length === 0) return null;

        return (
          <View key={category.key} style={themeStyles.section}>
            <Text style={themeStyles.sectionTitle}>{category.title}</Text>
            <FlatList
              data={data}
              renderItem={renderAnimeCard}
              keyExtractor={(item, index) => (item?.mal_id ?? index).toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Discover;

// ✅ Dynamic styles
const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: darkMode ? '#111827' : '#fff',
    },
    section: {
      marginVertical: 12,
      paddingLeft: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#93c5fd' : '#2e51a2',
      marginBottom: 8,
    },
    card: {
      width: 120,
      marginRight: 12,
    },
    image: {
      width: 120,
      height: 180,
      borderRadius: 8,
    },
    title: {
      fontSize: 13,
      fontWeight: '600',
      marginTop: 5,
      color: darkMode ? '#f9fafb' : '#333',
    },
    meta: {
      fontSize: 12,
      color: darkMode ? '#cbd5e1' : '#777',
      marginTop: 4,
    },
  });
