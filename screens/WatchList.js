// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// const dummyData = [
//   { id: '1', title: 'Attack on Titan', genre: 'Action', year: 2021, language: 'Japanese', tags: ['Dark', 'Gore'] },
//   { id: '2', title: 'Your Name', genre: 'Romance', year: 2016, language: 'Japanese', tags: ['Emotional'] },
//   { id: '3', title: 'Death Note', genre: 'Thriller', year: 2007, language: 'Japanese', tags: ['Dark', 'Supernatural'] },
//   { id: '4', title: 'One Piece', genre: 'Adventure', year: 1999, language: 'Japanese', tags: ['Comedy'] },
// ];

// const Watchlist = () => {
//   const [filters, setFilters] = useState({ genre: '', year: '', tag: '' });

//   const applyFilters = (anime) => {
//     const genreMatch = filters.genre === '' || anime.genre.toLowerCase().includes(filters.genre.toLowerCase());
//     const yearMatch = filters.year === '' || anime.year.toString().includes(filters.year);
//     const tagMatch = filters.tag === '' || anime.tags.some((tag) =>
//       tag.toLowerCase().includes(filters.tag.toLowerCase())
//     );
//     return genreMatch && yearMatch && tagMatch;
//   };

//   const filteredData = dummyData.filter(applyFilters);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎯 Filter Your Watchlist</Text>

//       <TextInput
//         placeholder="Filter by Genre (e.g. Action)"
//         style={styles.input}
//         onChangeText={(text) => setFilters({ ...filters, genre: text })}
//       />

//       <TextInput
//         placeholder="Filter by Year (e.g. 2021)"
//         style={styles.input}
//         keyboardType="numeric"
//         onChangeText={(text) => setFilters({ ...filters, year: text })}
//       />

//       <TextInput
//         placeholder="Filter by Tag (e.g. Dark)"
//         style={styles.input}
//         onChangeText={(text) => setFilters({ ...filters, tag: text })}
//       />

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.animeTitle}>{item.title}</Text>
//             <Text>🎬 Genre: {item.genre}</Text>
//             <Text>📅 Year: {item.year}</Text>
//             <Text>🈶 Language: {item.language}</Text>
//             <Text>🏷️ Tags: {item.tags.join(', ')}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 16, flex: 1, backgroundColor: '#f8f9fa' },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 2,
//   },
//   animeTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
// });

// export default Watchlist;





// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Watchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       setWatchlist(watchlistData ? JSON.parse(watchlistData) : []);
//     };

//     fetchWatchlist();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Watchlist</Text>
//       <FlatList
//         data={watchlist}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text>{item.title}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.mal_id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   card: { marginBottom: 16, padding: 16, borderRadius: 8, backgroundColor: '#fff' },
// });

// export default Watchlist;









// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Watchlist = ({ navigation }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     loadWatchlist();
//   }, []);

//   const loadWatchlist = async () => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       setWatchlist(parsedData);
//     } catch (err) {
//       console.error('Error loading watchlist:', err);
//     }
//   };

//   const removeFromWatchlist = async (animeId) => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       const updatedWatchlist = parsedData.filter((anime) => anime.mal_id !== animeId);
//       await AsyncStorage.setItem('@watchlist', JSON.stringify(updatedWatchlist));
//       loadWatchlist();  // Refresh watchlist after removal
//       Alert.alert('Removed', 'Anime removed from your watchlist!');
//     } catch (err) {
//       console.error('Error removing from watchlist:', err);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Image source={{ uri: item.image }} style={styles.poster} />
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.info}>Episodes: {item.episodes}</Text>
//         <Text style={styles.info}>Genres: {item.genres.map(genre => genre.name).join(', ')}</Text>
//         <TouchableOpacity
//           style={styles.removeButton}
//           onPress={() => removeFromWatchlist(item.mal_id)}
//         >
//           <Text style={styles.removeButtonText}>Remove from Watchlist</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Watchlist</Text>
//       {watchlist.length === 0 ? (
//         <Text style={styles.noItemsText}>Your watchlist is empty.</Text>
//       ) : (
//         <FlatList
//           data={watchlist}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.mal_id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   itemContainer: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12 },
//   poster: { width: 100, height: 150, borderRadius: 8, marginRight: 16 },
//   textContainer: { flex: 1 },
//   title: { fontSize: 18, fontWeight: 'bold' },
//   info: { fontSize: 14, color: '#666' },
//   removeButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   removeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   noItemsText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
// });

// export default Watchlist;










// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Watchlist = ({ navigation }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     loadWatchlist();
//   }, []);

//   const loadWatchlist = async () => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       setWatchlist(parsedData);  // Update the state to trigger re-render
//     } catch (err) {
//       console.error('Error loading watchlist:', err);
//     }
//   };

//   const addToWatchlist = async (anime) => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       const alreadyExists = parsedData.some(item => item.mal_id === anime.mal_id);

//       if (!alreadyExists) {
//         parsedData.push({
//           mal_id: anime.mal_id,
//           title: anime.title,
//           image: anime.images.jpg.large_image_url,
//           episodes: anime.episodes || 0,
//           genres: anime.genres || [],
//         });
//         await AsyncStorage.setItem('@watchlist', JSON.stringify(parsedData));
//         loadWatchlist();  // Refresh the watchlist after adding new anime
//         Alert.alert('Success', 'Anime added to Watchlist!');
//       } else {
//         Alert.alert('Already in Watchlist', 'This anime is already in your watchlist.');
//       }
//     } catch (err) {
//       console.error('Error adding anime to watchlist:', err);
//     }
//   };

//   const removeFromWatchlist = async (animeId) => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       const updatedWatchlist = parsedData.filter((anime) => anime.mal_id !== animeId);
//       await AsyncStorage.setItem('@watchlist', JSON.stringify(updatedWatchlist));
//       loadWatchlist();  // Refresh watchlist after removal
//       Alert.alert('Removed', 'Anime removed from your watchlist!');
//     } catch (err) {
//       console.error('Error removing from watchlist:', err);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Image source={{ uri: item.image }} style={styles.poster} />
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.info}>Episodes: {item.episodes}</Text>
//         <Text style={styles.info}>Genres: {item.genres.map(genre => genre.name).join(', ')}</Text>
//         <TouchableOpacity
//           style={styles.removeButton}
//           onPress={() => removeFromWatchlist(item.mal_id)}
//         >
//           <Text style={styles.removeButtonText}>Remove from Watchlist</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Watchlist</Text>
//       {watchlist.length === 0 ? (
//         <Text style={styles.noItemsText}>Your watchlist is empty.</Text>
//       ) : (
//         <FlatList
//           data={watchlist}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.mal_id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   itemContainer: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12 },
//   poster: { width: 100, height: 150, borderRadius: 8, marginRight: 16 },
//   textContainer: { flex: 1 },
//   title: { fontSize: 18, fontWeight: 'bold' },
//   info: { fontSize: 14, color: '#666' },
//   removeButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   removeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   noItemsText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
// });

// export default Watchlist;




// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// const Watchlist = ({ navigation }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   // Load watchlist data from AsyncStorage when the screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       loadWatchlist();
//     }, [])
//   );

//   const loadWatchlist = async () => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       setWatchlist(parsedData);  // Update state to trigger re-render
//     } catch (err) {
//       console.error('Error loading watchlist:', err);
//     }
//   };

//   const addToWatchlist = async (anime) => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       const alreadyExists = parsedData.some(item => item.mal_id === anime.mal_id);

//       if (!alreadyExists) {
//         parsedData.push({
//           mal_id: anime.mal_id,
//           title: anime.title,
//           image: anime.images.jpg.large_image_url,
//           episodes: anime.episodes || 0,
//           genres: anime.genres || [],
//         });
//         await AsyncStorage.setItem('@watchlist', JSON.stringify(parsedData));
//         loadWatchlist();  // Refresh watchlist after adding
//         Alert.alert('Success', 'Anime added to Watchlist!');
//       } else {
//         Alert.alert('Already in Watchlist', 'This anime is already in your watchlist.');
//       }
//     } catch (err) {
//       console.error('Error adding anime to watchlist:', err);
//     }
//   };

//   const removeFromWatchlist = async (animeId) => {
//     try {
//       const watchlistData = await AsyncStorage.getItem('@watchlist');
//       const parsedData = watchlistData ? JSON.parse(watchlistData) : [];
//       const updatedWatchlist = parsedData.filter((anime) => anime.mal_id !== animeId);
//       await AsyncStorage.setItem('@watchlist', JSON.stringify(updatedWatchlist));
//       loadWatchlist();  // Refresh watchlist after removal
//       Alert.alert('Removed', 'Anime removed from your watchlist!');
//     } catch (err) {
//       console.error('Error removing from watchlist:', err);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Image source={{ uri: item.image }} style={styles.poster} />
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.info}>Episodes: {item.episodes}</Text>
//         <Text style={styles.info}>Genres: {item.genres.map(genre => genre.name).join(', ')}</Text>
//         <TouchableOpacity
//           style={styles.removeButton}
//           onPress={() => removeFromWatchlist(item.mal_id)}
//         >
//           <Text style={styles.removeButtonText}>Remove from Watchlist</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Watchlist</Text>
//       {watchlist.length === 0 ? (
//         <Text style={styles.noItemsText}>Your watchlist is empty.</Text>
//       ) : (
//         <FlatList
//           data={watchlist}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.mal_id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   itemContainer: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12 },
//   poster: { width: 100, height: 150, borderRadius: 8, marginRight: 16 },
//   textContainer: { flex: 1 },
//   title: { fontSize: 18, fontWeight: 'bold' },
//   info: { fontSize: 14, color: '#666' },
//   removeButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   removeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   noItemsText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
// });

// export default Watchlist;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WatchList = () => {
//   // Define the categories
//   const categories = [
//     'All',
//     'Watching',
//     'Completed',
//     'On Hold',
//     'Dropped',
//     'Plan to Watch',
//   ];

//   // Set up state
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [shows, setShows] = useState([]);

//   const storageKey = 'user_shows';

//   // Load shows from AsyncStorage
//   useEffect(() => {
//     const loadShows = async () => {
//       try {
//         const savedShows = await AsyncStorage.getItem(storageKey);
//         if (savedShows) {
//           setShows(JSON.parse(savedShows));
//         }
//       } catch (error) {
//         console.error('Failed to load shows:', error);
//       }
//     };
//     loadShows();
//   }, []);

//   // Save shows to AsyncStorage
//   const saveShows = async (updatedShows) => {
//     try {
//       await AsyncStorage.setItem(storageKey, JSON.stringify(updatedShows));
//     } catch (error) {
//       console.error('Failed to save shows:', error);
//     }
//   };

//   // Add a new show to the selected category
//   const addShow = (title, category) => {
//     const newShow = {
//       id: Date.now(),
//       title,
//       category,
//     };

//     const updatedShows = [...shows, newShow];
//     setShows(updatedShows);
//     saveShows(updatedShows);
//   };

//   // Remove a show from the list
//   const removeShow = (id) => {
//     const updatedShows = shows.filter((show) => show.id !== id);
//     setShows(updatedShows);
//     saveShows(updatedShows);
//   };

//   // Filter shows based on selected category
//   const filteredShows = activeCategory === 'All' ? shows : shows.filter((show) => show.category === activeCategory);

//   const renderShow = ({ item }) => (
//     <View style={styles.showCard}>
//       <Text style={styles.showTitle}>{item.title}</Text>
//       <Text style={styles.showCategory}>{item.category}</Text>
//       <Button title="Remove" onPress={() => removeShow(item.id)} color="red" />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My WatchList</Text>

//       {/* Category buttons */}
//       <View style={styles.categoryButtons}>
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category}
//             style={[styles.categoryButton, activeCategory === category && styles.activeCategory]}
//             onPress={() => setActiveCategory(category)}
//           >
//             <Text style={styles.categoryText}>{category}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Add New Show Button */}
//       <TouchableOpacity style={styles.addShowButton} onPress={() => addShow('New Anime', 'Watching')}>
//         <Text style={styles.addShowText}>+ Add New Show</Text>
//       </TouchableOpacity>

//       {/* Show List */}
//       <FlatList
//         data={filteredShows}
//         renderItem={renderShow}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.showList}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   categoryButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
//   categoryButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     backgroundColor: '#f3f4f6',
//   },
//   activeCategory: {
//     backgroundColor: '#6200ee',
//     borderColor: '#6200ee',
//   },
//   categoryText: { color: '#000', fontSize: 14 },
//   addShowButton: {
//     backgroundColor: '#6200ee',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   addShowText: { color: '#fff', textAlign: 'center', fontSize: 16 },
//   showList: { paddingTop: 10 },
//   showCard: { padding: 15, backgroundColor: '#f3f4f6', marginBottom: 10, borderRadius: 8 },
//   showTitle: { fontSize: 16 },
//   showCategory: { fontSize: 12, color: '#6b7280' },
// });

// export default WatchList;















// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WatchList = () => {
//   const categories = [
//     'All',
//     'Watching',
//     'Completed',
//     'On Hold',
//     'Dropped',
//     'Plan to Watch',
//   ];

//   const [activeCategory, setActiveCategory] = useState('All');
//   const [shows, setShows] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newShowTitle, setNewShowTitle] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('Watching');
//   const [editShow, setEditShow] = useState(null);
//   const [editShowTitle, setEditShowTitle] = useState('');
//   const [editShowCategory, setEditShowCategory] = useState('');

//   const storageKey = 'user_shows';

//   // Load shows from AsyncStorage
//   useEffect(() => {
//     const loadShows = async () => {
//       try {
//         const savedShows = await AsyncStorage.getItem(storageKey);
//         if (savedShows) {
//           setShows(JSON.parse(savedShows));
//         }
//       } catch (error) {
//         console.error('Failed to load shows:', error);
//       }
//     };
//     loadShows();
//   }, []);

//   // Save shows to AsyncStorage
//   const saveShows = async (updatedShows) => {
//     try {
//       await AsyncStorage.setItem(storageKey, JSON.stringify(updatedShows));
//     } catch (error) {
//       console.error('Failed to save shows:', error);
//     }
//   };

//   // Add a new show to the selected category
//   const addShow = () => {
//     if (newShowTitle.trim() === '') {
//       Alert.alert('Error', 'Show title cannot be empty.');
//       return;
//     }

//     const newShow = {
//       id: Date.now(),
//       title: newShowTitle,
//       category: selectedCategory,
//     };

//     const updatedShows = [...shows, newShow];
//     setShows(updatedShows);
//     saveShows(updatedShows);
//     setShowModal(false); // Close the modal after adding
//     setNewShowTitle(''); // Reset the input field
//   };

//   // Edit a show
//   const editExistingShow = () => {
//     if (editShowTitle.trim() === '') {
//       Alert.alert('Error', 'Show title cannot be empty.');
//       return;
//     }

//     const updatedShows = shows.map((show) =>
//       show.id === editShow.id
//         ? { ...show, title: editShowTitle, category: editShowCategory }
//         : show
//     );

//     setShows(updatedShows);
//     saveShows(updatedShows);
//     setEditShow(null); // Close the edit modal
//     setEditShowTitle('');
//     setEditShowCategory('');
//   };

//   // Remove a show from the list
//   const removeShow = (id) => {
//     const updatedShows = shows.filter((show) => show.id !== id);
//     setShows(updatedShows);
//     saveShows(updatedShows);
//   };

//   // Clear all shows in the active category
//   const clearCategory = () => {
//     const updatedShows = shows.filter((show) => show.category !== activeCategory);
//     setShows(updatedShows);
//     saveShows(updatedShows);
//   };

//   // Filter shows based on selected category
//   const filteredShows = activeCategory === 'All' ? shows : shows.filter((show) => show.category === activeCategory);

//   const renderShow = ({ item }) => (
//     <View style={styles.showCard}>
//       <TouchableOpacity onPress={() => setEditShow(item)}>
//         <Text style={styles.showTitle}>{item.title}</Text>
//       </TouchableOpacity>
//       <Text style={styles.showCategory}>{item.category}</Text>
//       <Button title="Remove" onPress={() => removeShow(item.id)} color="red" />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My WatchList</Text>

//       {/* Category buttons */}
//       <View style={styles.categoryButtons}>
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category}
//             style={[styles.categoryButton, activeCategory === category && styles.activeCategory]}
//             onPress={() => setActiveCategory(category)}
//           >
//             <Text style={styles.categoryText}>{category}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Add New Show Button */}
//       <TouchableOpacity style={styles.addShowButton} onPress={() => setShowModal(true)}>
//         <Text style={styles.addShowText}>+ Add New Show</Text>
//       </TouchableOpacity>

//       {/* Clear Category Button */}
//       <TouchableOpacity style={styles.clearCategoryButton} onPress={clearCategory}>
//         <Text style={styles.clearCategoryText}>Clear All in {activeCategory}</Text>
//       </TouchableOpacity>

//       {/* Show List */}
//       <FlatList
//         data={filteredShows}
//         renderItem={renderShow}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.showList}
//       />

//       {/* Modal for Adding New Show */}
//       <Modal
//         visible={showModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowModal(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Add New Show</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Enter show title"
//               value={newShowTitle}
//               onChangeText={setNewShowTitle}
//             />

//             <Text style={styles.selectCategoryLabel}>Select Category:</Text>
//             <View style={styles.categorySelector}>
//               {categories.slice(1).map((category) => (
//                 <TouchableOpacity
//                   key={category}
//                   style={[
//                     styles.categoryOption,
//                     selectedCategory === category && styles.selectedCategoryOption,
//                   ]}
//                   onPress={() => setSelectedCategory(category)}
//                 >
//                   <Text style={styles.categoryOptionText}>{category}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <Button title="Add Show" onPress={addShow} />
//             <Button title="Cancel" onPress={() => setShowModal(false)} color="gray" />
//           </View>
//         </View>
//       </Modal>

//       {/* Modal for Editing Show */}
//       {editShow && (
//         <Modal
//           visible={!!editShow}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setEditShow(null)}
//         >
//           <View style={styles.modalBackground}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Edit Show</Text>

//               <TextInput
//                 style={styles.input}
//                 placeholder="Edit show title"
//                 value={editShowTitle}
//                 onChangeText={setEditShowTitle}
//               />

//               <Text style={styles.selectCategoryLabel}>Select Category:</Text>
//               <View style={styles.categorySelector}>
//                 {categories.slice(1).map((category) => (
//                   <TouchableOpacity
//                     key={category}
//                     style={[
//                       styles.categoryOption,
//                       editShowCategory === category && styles.selectedCategoryOption,
//                     ]}
//                     onPress={() => setEditShowCategory(category)}
//                   >
//                     <Text style={styles.categoryOptionText}>{category}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <Button title="Save Changes" onPress={editExistingShow} />
//               <Button title="Cancel" onPress={() => setEditShow(null)} color="gray" />
//             </View>
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   categoryButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
//   categoryButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     backgroundColor: '#f3f4f6',
//   },
//   activeCategory: {
//     backgroundColor: '#6200ee',
//     borderColor: '#6200ee',
//   },
//   categoryText: { color: '#000', fontSize: 14 },
//   addShowButton: {
//     backgroundColor: '#6200ee',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   addShowText: { color: '#fff', textAlign: 'center', fontSize: 16 },
//   clearCategoryButton: {
//     backgroundColor: 'red',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   clearCategoryText: { color: '#fff', textAlign: 'center', fontSize: 16 },
//   showList: { paddingTop: 10 },
//   showCard: { padding: 15, backgroundColor: '#f3f4f6', marginBottom: 10, borderRadius: 8 },
//   showTitle: { fontSize: 16 },
//   showCategory: { fontSize: 12, color: '#6b7280' },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   input: {
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   selectCategoryLabel: { fontSize: 16, marginBottom: 10 },
//   categorySelector: { flexDirection: 'row', flexWrap: 'wrap' },
//   categoryOption: {
//     backgroundColor: '#f3f4f6',
//     padding: 8,
//     borderRadius: 5,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   selectedCategoryOption: {
//     backgroundColor: '#6200ee',
//   },
//   categoryOptionText: { color: '#000', fontSize: 14 },
// });

// export default WatchList;

import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Alert, RefreshControl, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const WatchListScreen = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('watchlist');
      const data = jsonValue ? JSON.parse(jsonValue) : [];
      setWatchlist(data);
      setSearchResults(data);
    } catch (e) {
      console.error("Error fetching watchlist", e);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchWatchlist();
    setRefreshing(false);
  }, []);

  const handleRemoveItem = async (animeId) => {
    const updatedList = watchlist.filter(item => item.id !== animeId);
    await AsyncStorage.setItem('watchlist', JSON.stringify(updatedList));
    setWatchlist(updatedList);
    setSearchResults(updatedList);
    Alert.alert("Removed from Watchlist", "Anime has been removed.");
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = watchlist.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.category}</Text>
      <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveItem(item.id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const createTab = (category) => () => {
    const data = category === 'All'
      ? searchResults
      : searchResults.filter(item => item.category === category);

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>
            No anime found.
          </Text>
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Watchlist</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search anime..."
        value={search}
        onChangeText={handleSearch}
      />
      <Tab.Navigator>
        <Tab.Screen name="All" component={createTab('All')} />
        <Tab.Screen name="Watching" component={createTab('Watching')} />
        <Tab.Screen name="Completed" component={createTab('Completed')} />
        <Tab.Screen name="On Hold" component={createTab('On Hold')} />
        <Tab.Screen name="Dropped" component={createTab('Dropped')} />
        <Tab.Screen name="Plan to Watch" component={createTab('Plan to Watch')} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  itemContainer: {
    padding: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
  removeBtn: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#fff',
  },
});

export default WatchListScreen;
