// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';

// // Screens
// import Home from './screens/Home';
// import Discussion from './screens/Discussion';
// import Discover from './screens/Discover';
// import Seasonal from './screens/Seasonal';
// import MyAnime from './screens/MyAnime';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom Tab Navigation
// const BottomTabs = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ color, size }) => {
//         let iconName;
//         switch (route.name) {
//           case 'Home':
//             iconName = 'home';
//             break;
//           case 'Discussion':
//             iconName = 'chatbubbles';
//             break;
//           case 'Discover':
//             iconName = 'search';
//             break;
//           case 'Seasonal':
//             iconName = 'calendar';
//             break;
//           case 'MyAnime':
//             iconName = 'person';
//             break;
//         }
//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       headerShown: false,
//       tabBarActiveTintColor: '#1e40af',
//       tabBarInactiveTintColor: 'gray',
//     })}
//   >
//     <Tab.Screen name="Home" component={Home} />
//     <Tab.Screen name="Discussion" component={Discussion} />
//     <Tab.Screen name="Discover" component={Discover} />
//     <Tab.Screen name="Seasonal" component={Seasonal} />
//     <Tab.Screen name="MyAnime" component={MyAnime} />
//   </Tab.Navigator>
// );

// // Main App with Drawer
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator screenOptions={{ headerShown: false }}>
//         <Drawer.Screen name="Main" component={BottomTabs} />
//         {/* You can add extra screens like Profile or Settings here later */}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }




// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';

// // Screens
// import Home from './screens/Home';
// import Discussion from './screens/Discussion';
// import Discover from './screens/Discover';
// import Seasonal from './screens/Seasonal';
// import MyAnime from './screens/MyAnime';
// import Profile from './screens/Profile';
// import Settings from './screens/Settings';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// const BottomTabs = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ color, size }) => {
//         let iconName;

//         switch (route.name) {
//           case 'Home':
//             iconName = 'home-outline';
//             break;
//           case 'Discussion':
//             iconName = 'chatbubbles-outline';
//             break;
//           case 'Discover':
//             iconName = 'compass-outline';
//             break;
//           case 'Seasonal':
//             iconName = 'calendar-outline';
//             break;
//           case 'MyAnime':
//             iconName = 'person-outline';
//             break;
//         }

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: '#1e40af',
//       tabBarInactiveTintColor: 'gray',
//       headerShown: false,
//     })}
//   >
//     <Tab.Screen name="Home" component={Home} />
//     <Tab.Screen name="Discussion" component={Discussion} />
//     <Tab.Screen name="Discover" component={Discover} />
//     <Tab.Screen name="Seasonal" component={Seasonal} />
//     <Tab.Screen name="MyAnime" component={MyAnime} />
//   </Tab.Navigator>
// );

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="light" />
//       <Drawer.Navigator
//         screenOptions={{
//           headerStyle: { backgroundColor: '#1e40af' },
//           headerTintColor: '#fff',
//           drawerActiveTintColor: '#1e40af',
//         }}
//       >
//         <Drawer.Screen name="Anime App" component={BottomTabs} />
//         <Drawer.Screen name="Profile" component={Profile} />
//         <Drawer.Screen name="Settings" component={Settings} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <><ThemeProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      <MainNavigator />
      </ThemeProvider>
    </>
  );
}
