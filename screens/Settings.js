import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const [matureContent, setMatureContent] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [cloudSync, setCloudSync] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [selectedLanguage]);

  const loadSettings = async () => {
    try {
      const lang = await AsyncStorage.getItem('language');
      if (lang) setSelectedLanguage(lang);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('language', selectedLanguage);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been removed.');
          },
        },
      ]
    );
  };

  const handleCloudSyncToggle = (value) => {
    setCloudSync(value);
    if (value) {
      Alert.alert('Cloud Sync Enabled', 'Settings will now sync with the cloud.');
    }
  };

  return (
    <ScrollView style={[styles.container, darkMode && { backgroundColor: '#121212' }]}>
      <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>Content</Text>
      <SettingItem
        label="Mature Content"
        icon="visibility"
        value={matureContent}
        onValueChange={setMatureContent}
        darkMode={darkMode}
      />

      <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>Notifications</Text>
      <SettingItem
        label="Enable Notifications"
        icon="notifications"
        value={notificationsEnabled}
        onValueChange={setNotificationsEnabled}
        darkMode={darkMode}
      />

      <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>Display</Text>
      <SettingItem
        label="Dark Theme"
        icon="brightness-4"
        value={darkMode}
        onValueChange={toggleTheme}
        darkMode={darkMode}
      />

      {/* <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>Language</Text>
      <View style={[styles.languagePicker, darkMode && { backgroundColor: '#1f1f1f' }]}>
        <Icon name="language" size={24} color="#888" style={{ marginRight: 10 }} />
        <Picker
          selectedValue={selectedLanguage}
          style={{ flex: 1, color: darkMode ? '#fff' : '#000' }}
          onValueChange={(value) => setSelectedLanguage(value)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="日本語 (Japanese)" value="jp" />
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="Français" value="fr" />
        </Picker>
      </View> */}

      <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>Sync</Text>
      <SettingItem
        label="Cloud Sync"
        icon="cloud-upload"
        value={cloudSync}
        onValueChange={handleCloudSyncToggle}
        darkMode={darkMode}
      />

      {/* <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>Account</Text>
      <TouchableOpacity style={styles.actionRow} onPress={handleDeleteAccount}>
        <Icon name="delete" size={24} color="#e11d48" />
        <Text style={[styles.actionText, { color: '#e11d48' }]}>Delete Account</Text>
      </TouchableOpacity> */}

      <Text style={[styles.sectionTitle, darkMode && { color: '#fff' }]}>App</Text>
      <View style={[styles.infoRow, darkMode && { backgroundColor: '#1f1f1f' }]}>
        <Icon name="info" size={24} color="#888" />
        <Text style={[styles.infoText, darkMode && { color: '#ccc' }]}>App Version</Text>
        <Text style={[styles.version, darkMode && { color: '#aaa' }]}>
          {Constants.manifest?.version || '1.0.0'}
        </Text>
      </View>
    </ScrollView>
  );
}

const SettingItem = ({ label, icon, value, onValueChange, darkMode }) => (
  <View
    style={[
      styles.settingRow,
      darkMode && { backgroundColor: '#1f1f1f' },
    ]}
  >
    <Icon name={icon} size={24} color={darkMode ? '#ccc' : '#555'} />
    <Text style={[styles.settingText, darkMode && { color: '#fff' }]}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1f2937',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#374151',
  },
  languagePicker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
    marginLeft: 12,
  },
  version: {
    fontSize: 14,
    color: '#6b7280',
  },
});
