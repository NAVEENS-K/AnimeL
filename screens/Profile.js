



import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getAuth,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { app } from '../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from '../context/ThemeContext';

const auth = getAuth(app);

const defaultImage = 'https://picsum.photos/seed/profile/150';

const initialUser = {
  name: auth.currentUser?.displayName || 'John Doe',
  username:
    auth.currentUser?.displayName?.split(' ')[0].toLowerCase() || 'animefan',
  email: auth.currentUser?.email || 'john@example.com',
  image: defaultImage,
};

export default function Profile() {
  const { darkMode } = useContext(ThemeContext);
  const [user, setUser] = useState(initialUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need permission to access your media library.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const newUri = result.assets[0].uri;
      setUser((prev) => ({ ...prev, image: newUri }));
      Alert.alert('Image Updated', 'Your profile image has been updated.');
    }
  };

  const handleImageClick = () => {
    const options = ['Choose from Gallery', 'Reset to Default', 'Cancel'];
    const actions = [pickImage, () => setUser({ ...user, image: defaultImage })];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex !== 2) actions[buttonIndex]();
        }
      );
    } else {
      Alert.alert('Profile Image', 'Choose an option', [
        { text: 'Gallery', onPress: pickImage },
        {
          text: 'Reset',
          onPress: () => setUser({ ...user, image: defaultImage }),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  const handleSave = () => {
    setModalVisible(false);
    setPasswordModalVisible(true);
  };

  const handleConfirmPassword = async () => {
    try {
      const currentUser = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );

      await reauthenticateWithCredential(currentUser, credential);

      if (currentUser.email !== editEmail) {
        await updateEmail(currentUser, editEmail);
      }

      await updateProfile(currentUser, {
        displayName: editName,
      });

      setUser({
        ...user,
        name: editName,
        username: editUsername,
        email: editEmail,
      });

      Alert.alert('Profile Updated', 'Your changes have been saved.');
      setPassword('');
      setPasswordModalVisible(false);
    } catch (error) {
      Alert.alert('Authentication Failed', error.message);
      console.error('Error:', error);
    }
  };

  const colors = {
    background: darkMode ? '#111827' : '#f9fafb',
    card: darkMode ? '#1f2937' : '#fff',
    text: darkMode ? '#f9fafb' : '#1f2937',
    subtext: darkMode ? '#9ca3af' : '#6b7280',
    inputBg: darkMode ? '#374151' : '#fff',
    inputBorder: darkMode ? '#4b5563' : '#ccc',
    placeholder: darkMode ? '#9ca3af' : '#6b7280',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={handleImageClick}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.username, { color: colors.subtext }]}>@{user.username}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Info</Text>
        <InfoRow icon="email" label="Email" value={user.email} color={colors} />
        <InfoRow icon="person" label="Username" value={user.username} color={colors} />
      </View>

      <View style={styles.section}>
        {/* <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions</Text> */}
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.card }]}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="edit" size={22} color="#3b82f6" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.card }]}>
          <Icon name="logout" size={22} color="#ef4444" />
          <Text style={[styles.actionText, { color: '#ef4444' }]}>Log Out</Text>
        </TouchableOpacity> */}
      </View>

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Profile</Text>
            <TextInput
              placeholder="Name"
              value={editName}
              onChangeText={setEditName}
              style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
              placeholderTextColor={colors.placeholder}
            />
            <TextInput
              placeholder="Username"
              value={editUsername}
              onChangeText={setEditUsername}
              style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
              placeholderTextColor={colors.placeholder}
            />
            <TextInput
              placeholder="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
              placeholderTextColor={colors.placeholder}
            />
            <View style={styles.modalActions}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSave}>
                <Text style={styles.saveBtn}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Password Modal */}
      <Modal visible={passwordModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Confirm Password</Text>
            <TextInput
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
              placeholderTextColor={colors.placeholder}
            />
            <View style={styles.modalActions}>
              <Pressable onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleConfirmPassword}>
                <Text style={styles.saveBtn}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const InfoRow = ({ icon, label, value, color }) => (
  <View style={[styles.infoRow, { backgroundColor: color.card }]}>
    <Icon name={icon} size={22} color="#555" />
    <View style={{ marginLeft: 12 }}>
      <Text style={[styles.infoLabel, { color: color.subtext }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: color.text }]}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1e40af',
    marginBottom: 12,
  },
  userInfo: { alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold' },
  username: { fontSize: 14 },
  section: { marginBottom: 20, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoLabel: { fontSize: 13, fontWeight: '500' },
  infoValue: { fontSize: 14 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    color: '#1e40af',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: { color: '#888', marginRight: 20, fontWeight: 'bold' },
  saveBtn: { color: '#1e40af', fontWeight: 'bold' },
});













