// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Platform, StyleSheet } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';

// const Reminders = () => {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   useEffect(() => {
//     registerForPushNotificationsAsync();
//   }, []);

//   const handleConfirm = () => {
//     scheduleNotification(date);
//   };

//   const scheduleNotification = async (selectedDate) => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: '📺 Anime Reminder!',
//         body: "Don't forget your episode is airing!",
//       },
//       trigger: selectedDate,
//     });
//     alert('Reminder set!');
//   };

//   const registerForPushNotificationsAsync = async () => {
//     if (Device.isDevice) {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission not granted for notifications.');
//       }
//     } else {
//       alert('Must use physical device for notifications');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>⏰ Set Reminder</Text>
//       <Button title="Pick Date & Time" onPress={() => setShowPicker(true)} />

//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode="datetime"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowPicker(false);
//             if (selectedDate) setDate(selectedDate);
//           }}
//         />
//       )}

//       <View style={{ marginVertical: 20 }}>
//         <Text>Selected: {date.toLocaleString()}</Text>
//       </View>

//       <Button title="Set Reminder" onPress={handleConfirm} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
// });

// export default Reminders;







// // screens/EpisodeCalendar.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import moment from 'moment';

// const EpisodeCalendar = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       try {
//         const res = await axios.get('https://api.jikan.moe/v4/schedules');
//         setSchedule(res.data.data.slice(0, 50)); // limit to top 50 scheduled shows
//       } catch (err) {
//         console.error('Error fetching schedule:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchedule();
//   }, []);

//   const setReminder = (title, time) => {
//     // Here we simulate setting a reminder.
//     Alert.alert('Reminder Set', `We'll remind you to watch "${title}" on ${moment(time).format('MMMM Do, h:mm A')}`);
//     // In production, use expo-notifications or react-native-push-notification.
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>{item.entry.title}</Text>
//       <Text style={styles.details}>📅 {moment(item.broadcast.time, 'HH:mm').format('h:mm A')} — {item.broadcast.day}</Text>
//       <TouchableOpacity
//         onPress={() => setReminder(item.entry.title, `${item.broadcast.day} ${item.broadcast.time}`)}
//         style={styles.reminderBtn}
//       >
//         <Text style={{ color: '#fff', fontWeight: '600' }}>Set Reminder</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//         <Text>Loading upcoming episodes...</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={schedule}
//       keyExtractor={(item) => item.entry.mal_id.toString()}
//       renderItem={renderItem}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 10 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   card: {
//     backgroundColor: '#f3f4f6',
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   title: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
//   details: { fontSize: 13, color: '#6b7280', marginTop: 4 },
//   reminderBtn: {
//     marginTop: 8,
//     backgroundColor: '#2563eb',
//     padding: 8,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
// });

// // export default EpisodeCalendar;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Calendar } from 'react-native-calendars';
// import { Ionicons } from '@expo/vector-icons';

// export default function Reminders() {
//   const [reminders, setReminders] = useState([]);
//   const [title, setTitle] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [time, setTime] = useState(new Date());
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const addReminder = () => {
//     if (title && selectedDate) {
//       setReminders([
//         ...reminders,
//         {
//           id: Date.now(),
//           title,
//           date: selectedDate,
//           time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         },
//       ]);
//       setTitle('');
//       setSelectedDate('');
//     }
//   };

//   const deleteReminder = (id) => {
//     setReminders(reminders.filter((item) => item.id !== id));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>📅 Add Reminder</Text>

//       <Calendar
//         onDayPress={(day) => setSelectedDate(day.dateString)}
//         markedDates={{
//           [selectedDate]: { selected: true, marked: true, selectedColor: '#6200ee' },
//         }}
//         theme={{
//           calendarBackground: '#fff',
//           textSectionTitleColor: '#6200ee',
//           selectedDayBackgroundColor: '#6200ee',
//           selectedDayTextColor: '#fff',
//           todayTextColor: '#ffb347',
//         }}
//       />

//       <TextInput
//         placeholder="Reminder Title"
//         style={styles.input}
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
//         <Ionicons name="time" size={20} color="#fff" />
//         <Text style={styles.timeText}>Set Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
//       </TouchableOpacity>

//       {showTimePicker && (
//         <DateTimePicker
//           value={time}
//           mode="time"
//           is24Hour={false}
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(event, selectedTime) => {
//             setShowTimePicker(false);
//             if (selectedTime) setTime(selectedTime);
//           }}
//         />
//       )}

//       <TouchableOpacity style={styles.addButton} onPress={addReminder}>
//         <Text style={styles.addText}>Add Reminder</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={reminders}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.reminderCard}>
//             <Text style={styles.reminderTitle}>{item.title}</Text>
//             <Text style={styles.reminderInfo}>📅 {item.date} | ⏰ {item.time}</Text>
//             <TouchableOpacity onPress={() => deleteReminder(item.id)}>
//               <Ionicons name="trash" size={24} color="#ff4d4d" />
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
//   heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#333' },
//   input: {
//     backgroundColor: '#fff',
//     padding: 12,
//     marginVertical: 10,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   timeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#6200ee',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   timeText: { color: '#fff', marginLeft: 10, fontWeight: '600' },
//   addButton: {
//     backgroundColor: '#ffb347',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   addText: { color: '#fff', fontWeight: 'bold' },
//   reminderCard: {
//     backgroundColor: '#fff',
//     padding: 14,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     alignItems: 'center',
//     borderColor: '#ddd',
//     borderWidth: 1,
//   },
//   reminderTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
//   reminderInfo: { color: '#666', marginTop: 4 },
// });










import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Reminders() {
  const [reminderText, setReminderText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const stored = await AsyncStorage.getItem('reminders');
    if (stored) setReminders(JSON.parse(stored));
  };

  const storeReminders = async (updated) => {
    await AsyncStorage.setItem('reminders', JSON.stringify(updated));
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const scheduleReminder = async () => {
    if (!reminderText.trim()) {
      Alert.alert('Error', 'Please enter a reminder message');
      return;
    }

    const now = new Date();
    if (date <= now) {
      Alert.alert('Invalid Time', 'Please select a future date/time.');
      return;
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "📌 Reminder",
        body: reminderText,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: date,
    });

    const newReminder = {
      id,
      text: reminderText,
      date: date.toString(),
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    storeReminders(updated);
    setReminderText('');
    Alert.alert('Success', 'Reminder scheduled!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      <Text style={styles.reminderText}>📝 {item.text}</Text>
      <Text style={styles.reminderDate}>⏰ {new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set a Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter reminder text"
        value={reminderText}
        onChangeText={setReminderText}
      />

      <View style={styles.pickerRow}>
        <TouchableOpacity style={styles.pickerButton} onPress={() => showMode('date')}>
          <Text>📅 {date.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickerButton} onPress={() => showMode('time')}>
          <Text>⏰ {date.toLocaleTimeString()}</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

      <View style={styles.buttonWrapper}>
        <Button title="Add Reminder" onPress={scheduleReminder} color="#6200ee" />
      </View>

      <Text style={styles.subHeader}>Upcoming Reminders</Text>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonWrapper: { marginTop: 10, marginBottom: 20 },
  subHeader: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  reminderItem: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  reminderText: { fontSize: 16, fontWeight: 'bold' },
  reminderDate: { fontSize: 14, color: '#666' },
});
