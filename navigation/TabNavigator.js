import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import Discussion from '../screens/Discussion';
import Discover from '../screens/Discover';
import SeasonalTab from '../screens/SeasonalTab';
import MyAnime from '../screens/MyAnime';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icons = {
            Home: 'home-outline',
            Discussion: 'chatbubbles-outline',
            Discover: 'compass-outline',
            Seasonal: 'calendar-outline',
            MyAnime: 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Discussion" component={Discussion} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Seasonal" component={SeasonalTab} />
      <Tab.Screen name="MyAnime" component={MyAnime} />
    </Tab.Navigator>
  );
}
