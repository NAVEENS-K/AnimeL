// screens/EpisodeCalendar.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const EpisodeCalendar = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get('https://api.jikan.moe/v4/schedules');
        setSchedule(res.data.data.slice(0, 50)); // limit to top 50 scheduled shows
      } catch (err) {
        console.error('Error fetching schedule:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const setReminder = (title, time) => {
    // Here we simulate setting a reminder.
    Alert.alert('Reminder Set', `We'll remind you to watch "${title}" on ${moment(time).format('MMMM Do, h:mm A')}`);
    // In production, use expo-notifications or react-native-push-notification.
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.entry.title}</Text>
      <Text style={styles.details}>📅 {moment(item.broadcast.time, 'HH:mm').format('h:mm A')} — {item.broadcast.day}</Text>
      <TouchableOpacity
        onPress={() => setReminder(item.entry.title, `${item.broadcast.day} ${item.broadcast.time}`)}
        style={styles.reminderBtn}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading upcoming episodes...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={schedule}
      keyExtractor={(item) => item.entry.mal_id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  details: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  reminderBtn: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
});

export default EpisodeCalendar;
