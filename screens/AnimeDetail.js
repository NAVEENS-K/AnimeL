import React, { useEffect, useLayoutEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
  useColorScheme,
} from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import animeData from '../data/animeData';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const AnimeDetail = ({ route, navigation }) => {
  const { animeId } = route.params;
  const anime = animeData.find((a) => a.mal_id === animeId);
  const { darkMode } = useContext(ThemeContext);

  const isDark = darkMode;
  const themeStyles = styles(isDark);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: anime?.title || 'Anime Detail',
      headerStyle: {
        backgroundColor: isDark ? '#111' : '#fff',
      },
      headerTitleStyle: {
        color: isDark ? '#fff' : '#000',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
          <Icon name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, anime, isDark]);

  useEffect(() => {
    if (!anime || !anime.mal_id) {
      Alert.alert('Error', 'No anime data found. Please go back and try again.');
      navigation.goBack();
    }
  }, [anime]);

  const openTrailer = () => {
    if (anime?.trailer?.url) {
      Linking.openURL(anime.trailer.url);
    } else {
      Alert.alert('Error', 'Trailer not available.');
    }
  };

  const renderPosterScroll = () => {
    const images = [];
    if (anime.images?.jpg?.image_url) images.push(anime.images.jpg.image_url);
    if (
      anime.images?.webp?.image_url &&
      anime.images.webp.image_url !== anime.images.jpg.image_url
    ) {
      images.push(anime.images.webp.image_url);
    }

    return (
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={themeStyles.posterImage} />
        ))}
      </ScrollView>
    );
  };

  if (!anime) {
    return (
      <View style={themeStyles.centered}>
        <Text style={{ color: isDark ? '#fff' : '#000' }}>Anime not found. Please try again.</Text>
      </View>
    );
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <ScrollView style={themeStyles.container}>
          <View style={themeStyles.topSection}>
            <View style={themeStyles.posterLeft}>{renderPosterScroll()}</View>
            <View style={themeStyles.infoRight}>
              <Text style={themeStyles.rating}>Score: ⭐ {anime.score}</Text>
              <Text style={themeStyles.text}>Rank: #{anime.rank}</Text>
              <Text style={themeStyles.text}>Popularity: #{anime.views?.toLocaleString() || 'N/A'}</Text>
              <Text style={themeStyles.text}>Members: {anime.members?.toLocaleString() || 'N/A'}</Text>
              <Text style={themeStyles.text}>Favorites: {anime.favorites || 'N/A'}</Text>
            </View>
          </View>

          <View style={themeStyles.animeInfo}>
            <Text style={themeStyles.title}>{anime.title}</Text>
            <Text style={themeStyles.genres}>{anime.genres?.join(', ') || 'N/A'}</Text>
            <Text style={themeStyles.episodes}>
              Episodes: {anime.episodes || 'N/A'} | Aired: {anime.aired?.string || 'N/A'}
            </Text>
            <TouchableOpacity onPress={openTrailer}>
              <Text style={themeStyles.link}>🎬 Watch Trailer</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <Text style={themeStyles.sectionTitle}>Synopsis</Text>
            <Text style={themeStyles.text}>{anime.synopsis || 'N/A'}</Text>
          </View>

          <Text style={themeStyles.sectionTitle}>Characters</Text>
          <FlatList
            data={anime.characters}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={themeStyles.castCard}>
                <Image source={{ uri: item.image }} style={themeStyles.castImage} />
                <Text style={themeStyles.castName}>{item.name}</Text>
                <Text style={[themeStyles.castRole]}>{item.role}</Text>
              </View>
            )}
          />

          <View style={{ padding: 15 }}>
            <Text style={themeStyles.sectionTitle}>News & Discussions</Text>
            <Text style={themeStyles.text}>Coming soon...</Text>
          </View>
        </ScrollView>

        <Portal>
          <FAB
            icon="plus"
            label="Add"
            style={themeStyles.fab}
            onPress={() => {
              navigation.navigate('AddListScreen', {
                anime: {
                  title: anime.title || 'Unknown Title',
                  mal_id: anime.mal_id,
                  episodes: anime.episodes || 0,
                  type: anime.type || 'Unknown',
                },
              });
            }}
          />
        </Portal>
      </View>
    </Provider>
  );
};

export default AnimeDetail;

const styles = (isDark) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? '#111827' : '#fff',
      paddingTop: 10,
    },
    topSection: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    posterLeft: {
      width: width * 0.35,
      height: 170,
    },
    posterImage: {
      width: width * 0.35,
      height: 170,
      borderRadius: 6,
      marginRight: 10,
    },
    infoRight: {
      flex: 1,
      justifyContent: 'space-evenly',
      paddingHorizontal: 10,
    },
    rating: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#facc15',
    },
    text: {
      color: isDark ? '#ddd' : '#333',
    },
    animeInfo: {
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    genres: {
      fontStyle: 'italic',
      marginVertical: 4,
      color: isDark ? '#aaa' : '#666',
    },
    episodes: {
      fontSize: 14,
      color: isDark ? '#ccc' : '#333',
    },
    link: {
      marginTop: 5,
      color: '#3b82f6',
      textDecorationLine: 'underline',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 15,
      marginVertical: 10,
      color: isDark ? '#fff' : '#000',
    },
    castCard: {
      alignItems: 'center',
      marginHorizontal: 8,
    },
    castImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    castName: {
      width: 70,
      textAlign: 'center',
      fontSize: 12,
      marginTop: 4,
      color: isDark ? '#f3f4f6' : '#1f2937',
    },
    castRole: {
      fontSize: 10,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 60,
      backgroundColor: '#3b82f6',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
