// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MyAnimeList from './MyAnimeList';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { AnimeListContext } from '../context/AnimeListContext';

// const Tab = createMaterialTopTabNavigator();

// const MyAnime = () => {
//   const navigation = useNavigation();
//   const { animeList } = useContext(AnimeListContext);

//   const tabScreens = [
//     { name: 'All', status: 'all' },
//     { name: 'Watching', status: 'Watching' },
//     { name: 'Completed', status: 'Completed' },
//     { name: 'On Hold', status: 'On Hold' },
//     { name: 'Plan to Watch', status: 'Plan to Watch' },
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarScrollEnabled: true,
//           tabBarIndicatorStyle: { backgroundColor: '#1e90ff', height: 3 },
//           tabBarStyle: { backgroundColor: '#f8f9fa' },
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
//         }}
//       >
//         {tabScreens.map((tab) => (
//           <Tab.Screen
//             key={tab.name}
//             name={tab.name}
//             children={() => (
//               <MyAnimeList
//                 status={tab.status}
//                 animeList={animeList}
//                 navigation={navigation}
//               />
//             )}
//           />
//         ))}
//       </Tab.Navigator>
//     </View>
//   );
// };

// export default MyAnime;

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: '#1e90ff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     padding: 10,
//   },
//   mangaToggle: {
//     padding: 5,
//     backgroundColor: '#1565c0',
//     borderRadius: 5,
//   },
//   filterRow: {
//     backgroundColor: '#f8f9fa',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   filterGroup: {
//     marginRight: 20,
//     width: 150,
//   },
//   filterLabel: {
//     fontWeight: 'bold',
//     marginBottom: 1,
//     color: '#333',
//   },
//   picker: {
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding:1
    
//   },
// });







import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyAnimeList from './MyAnimeList';
import { useNavigation } from '@react-navigation/native';
import { AnimeListContext } from '../context/AnimeListContext';
import { ThemeContext } from '../context/ThemeContext';

const Tab = createMaterialTopTabNavigator();

const MyAnime = () => {
  const navigation = useNavigation();
  const { animeList } = useContext(AnimeListContext);
  const { darkMode } = useContext(ThemeContext);

  const tabScreens = [
    { name: 'All', status: 'all' },
    { name: 'Watching', status: 'Watching' },
    { name: 'Completed', status: 'Completed' },
    { name: 'On Hold', status: 'On Hold' },
    { name: 'Plan to Watch', status: 'Plan to Watch' },
  ];

  const themeStyles = getStyles(darkMode);

  return (
    <View style={[{ flex: 1 }, themeStyles.container]}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: darkMode ? '#93c5fd' : '#1e90ff',
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: darkMode ? '#1f2937' : '#f8f9fa',
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: darkMode ? '#fff' : '#333',
          },
        }}
      >
        {tabScreens.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            children={() => (
              <MyAnimeList
                status={tab.status}
                animeList={animeList}
                navigation={navigation}
              />
            )}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default MyAnime;

const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: darkMode ? '#111827' : '#fff',
    },
  });
