import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationSettings() {
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [episodeReminders, setEpisodeReminders] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);
  const [clubUpdates, setClubUpdates] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [notificationsEnabled, episodeReminders, friendRequests, clubUpdates]);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('notificationSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotificationsEnabled(parsed.notificationsEnabled ?? true);
        setEpisodeReminders(parsed.episodeReminders ?? true);
        setFriendRequests(parsed.friendRequests ?? true);
        setClubUpdates(parsed.clubUpdates ?? false);
      }
    } catch (err) {
      console.error('Failed to load notification settings:', err);
    }
  };

  const saveSettings = async () => {
    try {
      const data = {
        notificationsEnabled,
        episodeReminders,
        friendRequests,
        clubUpdates,
      };
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save notification settings:', err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <ToggleRow
          label="Enable Notifications"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <ToggleRow
          label="Episode Release Reminders"
          value={episodeReminders}
          onValueChange={setEpisodeReminders}
        />
        <ToggleRow
          label="Friend Requests"
          value={friendRequests}
          onValueChange={setFriendRequests}
        />
        <ToggleRow
          label="Club Updates"
          value={clubUpdates}
          onValueChange={setClubUpdates}
        />
      </ScrollView>
    </View>
  );
}

const ToggleRow = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? '#1e40af' : '#ccc'}
      trackColor={{ false: '#ccc', true: '#93c5fd' }}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#1e40af',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#111827',
  },
});
