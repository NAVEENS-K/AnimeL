import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Analytics = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [genreCount, setGenreCount] = useState({});
  const [monthlyCount, setMonthlyCount] = useState({});
  const [episodeCount, setEpisodeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const data = await AsyncStorage.getItem('@watchlist');
      const parsed = data ? JSON.parse(data) : [];

      setWatchlist(parsed);
      processAnalytics(parsed);
    } catch (err) {
      console.error('Error loading watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const processAnalytics = (animeList) => {
    let genres = {};
    let totalEpisodes = 0;
    let months = {};

    animeList.forEach((anime) => {
      totalEpisodes += Number(anime.watchedEpisodes) || 0;

      anime.genres?.forEach((genre) => {
        genres[genre.name] = (genres[genre.name] || 0) + 1;
      });

      const addedAt = anime.addedAt ? new Date(anime.addedAt) : null;
      if (addedAt instanceof Date && !isNaN(addedAt)) {
        const monthYear = addedAt.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        }); // e.g., Apr 2024
        months[monthYear] = (months[monthYear] || 0) + 1;
      }
    });

    setGenreCount(genres);
    setMonthlyCount(months);
    setEpisodeCount(totalEpisodes);
  };

  const getPieChartData = () => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#91e1a8', '#a891e1'];
    const keys = Object.keys(genreCount).slice(0, 5);
    return keys.map((genre, i) => ({
      name: genre,
      population: genreCount[genre],
      color: colors[i % colors.length],
      legendFontColor: '#333',
      legendFontSize: 14,
    }));
  };

  const getLineChartData = () => {
    const validEntries = Object.entries(monthlyCount)
      .filter(([label, value]) => label && Number.isFinite(value))
      .sort(
        ([a], [b]) =>
          new Date(`1 ${a}`) - new Date(`1 ${b}`) // e.g., '1 Apr 2024'
      );

    const labels = validEntries.map(([label]) => label);
    const data = validEntries.map(([_, value]) => value);

    return {
      labels,
      datasets: [{ data }],
    };
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, marginTop: 50 }} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Analytics</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total Episodes Watched</Text>
        <Text style={styles.value}>{episodeCount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Top Genres</Text>
        {Object.keys(genreCount).length > 0 ? (
          <PieChart
            data={getPieChartData()}
            width={screenWidth - 30}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <Text style={styles.noData}>No genre data available.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Anime Added per Month</Text>
        {Object.keys(monthlyCount).length > 0 ? (
          <LineChart
            data={getLineChartData()}
            width={screenWidth - 30}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 10 }}
          />
        ) : (
          <Text style={styles.noData}>No time-based data available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
  labelColor: () => '#333',
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#1e40af',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  noData: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default Analytics;
