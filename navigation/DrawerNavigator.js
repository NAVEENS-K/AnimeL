import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Make sure this is correct
import { AuthContext } from '../context/AuthContext';
import {NotificationScreen} from '../screens/NotificationScreen'

import BottomTabs from './TabNavigator';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

function CustomHeader() {
  const navigation = useNavigation();
  const navState = useNavigationState((state) => state);
  const currentRoute =
    navState?.routes?.[navState.index]?.state?.routes?.[
      navState.routes[navState.index]?.state?.index ?? 0
    ]?.name;
  const isHome = currentRoute === 'Home';

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-outline" size={26} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.topTitle}>AnimeL</Text>
      <View style={styles.topRight}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() =>navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CustomDrawerContent(props) {
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              setUser(null); // ⬅️ This resets the auth context
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Logout failed', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: () => <CustomHeader />,
        drawerActiveTintColor: '#1e40af',
      }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabs} options={{ title: 'Home' }} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e40af',
    paddingTop: 7,
    paddingBottom: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  topTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    margin: 16,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});
