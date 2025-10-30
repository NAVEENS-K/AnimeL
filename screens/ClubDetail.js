import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
  Pressable,
  useColorScheme,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import clubDiscussionData from '../data/clubdiscussionData';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const Tab = createMaterialTopTabNavigator();

const ClubDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { darkMode } = useContext(ThemeContext);

  const { clubId } = route.params;
  const [joined, setJoined] = useState(false);
  const [club, setClub] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [joinedDate, setJoinedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const loadClub = async () => {
    const joinedClubs = await AsyncStorage.getItem('joinedClubs');
    const ids = joinedClubs ? JSON.parse(joinedClubs) : [];
    setJoined(ids.includes(clubId));
    setClub(clubDiscussionData.find((c) => c.clubId === clubId));
  };

  useEffect(() => {
    loadClub();
  }, []);

  const handleJoin = async () => {
    const stored = await AsyncStorage.getItem('joinedClubs');
    const ids = stored ? JSON.parse(stored) : [];
    const updated = [...new Set([...ids, clubId])];
    await AsyncStorage.setItem('joinedClubs', JSON.stringify(updated));
    setJoined(true);
    setJoinedDate(new Date().toDateString());
  };

  const handlePost = () => {
    if (!newSubject || !newContent) {
      Alert.alert('Enter both subject and content');
      return;
    }

    const post = {
      id: `${clubId}-post-${Date.now()}`,
      profileImage: 'https://picsum.photos/seed/user/50',
      username: 'You',
      time: 'Just now',
      subject: newSubject,
      content: newContent,
    };

    club.couch.unshift(post);
    club.cabinet.unshift({ ...post, time: new Date().toDateString() });

    setNewSubject('');
    setNewContent('');
    setShowModal(false);
  };

  if (!club) {
    return <View style={styles.centered}><Text>Club not found.</Text></View>;
  }

  const themeStyles = getStyles(darkMode);

  return (
    <View style={{ flex: 1, backgroundColor: themeStyles.bg }}>
      <View style={[themeStyles.headerRow]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={themeStyles.iconColor} />
        </TouchableOpacity>
      </View>

      <View style={[themeStyles.headerSection]}>
        <Image source={{ uri: club.image }} style={themeStyles.clubImage} />
        <View style={themeStyles.infoRight}>
          <Text style={themeStyles.created}>
            Created: {new Date(club.createdAt).toDateString()}
          </Text>
          {!joined ? (
            <TouchableOpacity style={themeStyles.joinButton} onPress={handleJoin}>
              <Text style={themeStyles.joinText}>Join</Text>
            </TouchableOpacity>
          ) : (
            <Text style={themeStyles.joinedText}>Joined • {joinedDate}</Text>
          )}
        </View>
      </View>

      <View style={[themeStyles.about]}>
        <Text style={themeStyles.aboutText}>{club.about}</Text>
        <Text style={themeStyles.members}>👥 {club.membersCount}k members</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#1e40af' },
          tabBarStyle: { backgroundColor: darkMode ? '#1f2937' : '#fff' },
        }}
      >
        <Tab.Screen
          name="Couch"
          children={() => <DiscussionTab data={club.couch} darkMode={darkMode} />}
          options={{ tabBarLabel: '🛋️ Couch' }}
        />
        <Tab.Screen
          name="Cabinet"
          children={() => <DiscussionTab data={club.cabinet} darkMode={darkMode} />}
          options={{ tabBarLabel: '🗂️ Cabinet' }}
        />
        <Tab.Screen
          name="Members"
          children={() => <MembersTab data={club.members} darkMode={darkMode} />}
          options={{ tabBarLabel: '👥 Members' }}
        />
      </Tab.Navigator>

      {joined && (
        <>
          <FAB icon="plus" style={themeStyles.fab} onPress={() => setShowModal(true)} />

          <Modal visible={showModal} transparent animationType="slide">
            <View style={themeStyles.modalContainer}>
              <View style={themeStyles.modalBox}>
                <Text style={themeStyles.modalTitle}>New Discussion</Text>

                <TextInput
                  placeholder="Subject"
                  placeholderTextColor="#999"
                  value={newSubject}
                  onChangeText={setNewSubject}
                  style={themeStyles.input}
                />

                <TextInput
                  placeholder="Content"
                  placeholderTextColor="#999"
                  value={newContent}
                  onChangeText={setNewContent}
                  multiline
                  numberOfLines={4}
                  style={[themeStyles.input, { height: 100, textAlignVertical: 'top' }]}
                />

                <View style={themeStyles.modalActions}>
                  <Pressable onPress={() => setShowModal(false)}>
                    <Text style={themeStyles.cancelBtn}>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={handlePost}>
                    <Text style={themeStyles.postBtn}>Post</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const DiscussionTab = ({ data, darkMode }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
    contentContainerStyle={{ padding: 10 }}
    renderItem={({ item }) => (
      <View style={[styles.discussionCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
        <Image source={{ uri: item.profileImage }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.username, { color: darkMode ? '#fff' : '#000' }]}>
            {item.username} • {item.time}
          </Text>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </View>
    )}
  />
);

const MembersTab = ({ data, darkMode }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
    contentContainerStyle={{ padding: 10 }}
    renderItem={({ item }) => (
      <View style={styles.memberCard}>
        <Image source={{ uri: item.image }} style={styles.memberAvatar} />
        <Text style={[styles.memberName, { color: darkMode ? '#fff' : '#000' }]}>{item.name}</Text>
      </View>
    )}
  />
);

// Dynamic style generator for dark mode
const getStyles = (darkMode) =>
  StyleSheet.create({
    bg: darkMode ? '#0f172a' : '#fff',
    iconColor: darkMode ? '#fff' : '#1e40af',
    headerRow: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerSection: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: darkMode ? '#1e293b' : '#e0e7ff',
      alignItems: 'center',
    },
    clubImage: { width: 60, height: 60, borderRadius: 30 },
    infoRight: { marginLeft: 12 },
    created: { fontSize: 14, color: darkMode ? '#cbd5e1' : '#374151' },
    joinButton: {
      backgroundColor: '#1e40af',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      marginTop: 4,
    },
    joinText: { color: '#fff', fontWeight: '600' },
    joinedText: { marginTop: 4, color: '#60a5fa', fontWeight: '600' },
    about: { padding: 12, backgroundColor: darkMode ? '#1e293b' : '#f3f4f6' },
    aboutText: { fontSize: 14, marginBottom: 6, color: darkMode ? '#f1f5f9' : '#1f2937' },
    members: { fontSize: 12, color: darkMode ? '#cbd5e1' : '#6b7280' },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: '#1e40af',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalBox: {
      marginHorizontal: 20,
      backgroundColor: darkMode ? '#1f2937' : '#fff',
      padding: 16,
      borderRadius: 8,
    },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#fff' },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 6,
      marginBottom: 10,
      color: '#fff',
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cancelBtn: { marginRight: 16, color: '#999', fontWeight: 'bold' },
    postBtn: { color: '#60a5fa', fontWeight: 'bold' },
  });

const styles = StyleSheet.create({
  discussionCard: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  username: { fontWeight: '600' },
  subject: { fontSize: 13, fontWeight: 'bold', color: '#60a5fa' },
  content: { fontSize: 13, color: '#cbd5e1' },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  memberName: { fontSize: 14, fontWeight: '500' },
});

export default ClubDetail;
