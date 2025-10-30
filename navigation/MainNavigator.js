// MainNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import AnimeDetail from '../screens/AnimeDetail';
import AddToListScreen from '../screens/AddListScreen';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { AnimeListProvider } from '../context/AnimeListContext';
import ClubDetail from '../screens/ClubDetail';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import NotificationScreen from '../screens/NotificationScreen';
import NotificationSettings from '../screens/NotificationSettings';
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { darkMode } = useContext(ThemeContext);
  const { user, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="AnimeDetail" component={AnimeDetail} />
            <Stack.Screen name="AddListScreen" component={AddToListScreen} />
            <Stack.Screen name="ClubDetail" component={ClubDetail} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function MainNavigator() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AnimeListProvider>
          <AppNavigator />
        </AnimeListProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
