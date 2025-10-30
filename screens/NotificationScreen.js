// // import React, { useState, useContext } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   RefreshControl,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { ThemeContext } from '../context/ThemeContext';


// // const mockNotifications = [
// //   {
// //     id: '1',
// //     type: 'friend_request',
// //     title: 'New Friend Request',
// //     message: 'User123 wants to be your friend.',
// //     avatar: 'https://picsum.photos/seed/user1/50',
// //     time: '5m ago',
// //   },
// //   {
// //     id: '2',
// //     type: 'club_invite',
// //     title: 'Club Invite',
// //     message: 'You were invited to join "Anime Lovers".',
// //     avatar: 'https://picsum.photos/seed/club1/50',
// //     time: '10m ago',
// //   },
// //   {
// //     id: '3',
// //     type: 'comment',
// //     title: 'New Comment',
// //     message: 'AnimeFan99 commented on your post.',
// //     avatar: 'https://picsum.photos/seed/user3/50',
// //     time: '30m ago',
// //   },
// //   {
// //     id: '4',
// //     type: 'episode_release',
// //     title: 'New Episode Released',
// //     message: 'Attack on Titan S4 - Ep. 10 is out now!',
// //     avatar: 'https://picsum.photos/seed/ep4/50',
// //     time: '1h ago',
// //   },
// // ];

// // const NotificationScreen = () => {
// //   const { darkMode } = useContext(ThemeContext);

// //   const navigation = useNavigation();
// //   const [notifications, setNotifications] = useState(mockNotifications);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const onRefresh = () => {
// //     setRefreshing(true);
// //     setTimeout(() => setRefreshing(false), 1000);
// //   };

// //   const renderNotification = ({ item }) => (
// //     <TouchableOpacity style={styles.card}>
// //       <Image source={{ uri: item.avatar }} style={styles.avatar} />
// //       <View style={styles.textContainer}>
// //         <Text style={styles.title}>{item.title}</Text>
// //         <Text style={styles.message}>{item.message}</Text>
// //         <Text style={styles.time}>{item.time}</Text>
// //       </View>
// //       <Ionicons name="chevron-forward" size={18} color="#ccc" />
// //     </TouchableOpacity>
// //   );

// //   return (

// //     <View style={styles.container }>
// //       {/* Top Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Ionicons name="arrow-back" size={24} color="#fff" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Notifications</Text>
// //         <View style={{ width: 24 }} /> {/* Spacer for alignment */}
// //       </View>

// //       {/* List */}
// //       <FlatList
// //         data={notifications}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderNotification}
// //         refreshControl={
// //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// //         }
// //         ListEmptyComponent={
// //           <Text style={styles.empty}>You have no notifications.</Text>
// //         }
// //         contentContainerStyle={{ padding: 10 }}
// //       />
// //     </View>
// //   );
// // };

// // export default NotificationScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f9fafb',
// //   },
// //   header: {
// //     backgroundColor: '#1e40af',
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //   },
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 12,
// //     marginBottom: 10,
// //     elevation: 1,
// //   },
// //   avatar: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     marginRight: 12,
// //   },
// //   textContainer: {
// //     flex: 1,
// //   },
// //   title: {
// //     fontWeight: 'bold',
// //     color: '#111827',
// //   },
// //   message: {
// //     color: '#4b5563',
// //     marginTop: 2,
// //     fontSize: 13,
// //   },
// //   time: {
// //     fontSize: 12,
// //     color: '#9ca3af',
// //     marginTop: 4,
// //   },
// //   empty: {
// //     textAlign: 'center',
// //     color: '#6b7280',
// //     marginTop: 20,
// //     fontSize: 14,
// //   },
// // });







import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const mockNotifications = [
  {
    id: '1',
    type: 'friend_request',
    title: 'New Friend Request',
    message: 'User123 wants to be your friend.',
    avatar: 'https://picsum.photos/seed/user1/50',
    time: '5m ago',
  },
  {
    id: '2',
    type: 'club_invite',
    title: 'Club Invite',
    message: 'You were invited to join "Anime Lovers".',
    avatar: 'https://picsum.photos/seed/club1/50',
    time: '10m ago',
  },
  {
    id: '3',
    type: 'comment',
    title: 'New Comment',
    message: 'AnimeFan99 commented on your post.',
    avatar: 'https://picsum.photos/seed/user3/50',
    time: '30m ago',
  },
  {
    id: '4',
    type: 'episode_release',
    title: 'New Episode Released',
    message: 'Attack on Titan S4 - Ep. 10 is out now!',
    avatar: 'https://picsum.photos/seed/ep4/50',
    time: '1h ago',
  },
];

const NotificationScreen = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: darkMode ? '#1f2937' : '#fff' },
      ]}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: darkMode ? '#f9fafb' : '#111827' }]}>
          {item.title}
        </Text>
        <Text style={[styles.message, { color: darkMode ? '#d1d5db' : '#4b5563' }]}>
          {item.message}
        </Text>
        <Text style={[styles.time, { color: darkMode ? '#9ca3af' : '#9ca3af' }]}>
          {item.time}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={darkMode ? '#9ca3af' : '#ccc'} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={darkMode ? '#fff' : '#000'}
          />
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
            You have no notifications.
          </Text>
        }
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  message: {
    marginTop: 2,
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});




