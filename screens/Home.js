// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import { ThemeContext } from '../context/ThemeContext';


// // const { darkMode } = useContext(ThemeContext);



// const sampleDescriptions = [
//   "The battle intensifies as the new villain appears.",
//   "Friendships are tested in this gripping episode.",
//   "A surprise twist changes everything.",
//   "The team journeys through a perilous mountain.",
//   "Romantic tensions build up at the academy.",
//   "Time travel creates chaos in the timeline.",
//   "Power awakens in an unexpected ally.",
//   "A heartwarming reunion with old friends.",
//   "This episode unveils a hidden past.",
//   "Rivalry reaches new heights in this duel.",
// ];

// const dummyData = Array.from({ length: 100 }).map((_, index) => ({
//   id: index + 1,
//   title: `Anime Episode ${index + 1}`,
//   description: sampleDescriptions[index % sampleDescriptions.length],
//   isNew: index % 4 === 0,
//   image: `https://picsum.photos/seed/${index}/200/200`,
//   likeCount: Math.floor(Math.random() * 200),
// }));

// export default function Home() {
//   const [liked, setLiked] = useState({});

//   const handleLike = (id) => {
//     setLiked((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };
 

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item.image }}
//         style={styles.avatar}
//         resizeMode="cover"
//       />
//       <View style={styles.infoContainer}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>{item.title}</Text>
//           {item.isNew && <Text style={styles.newBadge}>NEW</Text>}
//         </View>
//         <Text style={styles.description}>{item.description}</Text>
//         <View style={styles.actionsRow}>
//           <TouchableOpacity>
//             {/* <Feather name="file-text" size={20} color="#3b82f6" /> */}
//           <Text style={{fontSize:16}}>💬</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
//             <Text style={{ fontSize: 16 }}>❤️</Text>
//             <Text style={styles.likeText}>
//               {liked[item.id] ? item.likeCount + 1 : item.likeCount}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
      
//       <FlatList
//         data={dummyData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         contentContainerStyle={{ paddingBottom: 80 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',

//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1e40af',
//     paddingTop: 50,
//     paddingBottom: 10,
//     paddingHorizontal: 16,
//     justifyContent: 'space-between',
//   },
//   topTitle: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   topRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   // mangaBtn: {
//   //   color: '#fff',
//   //   backgroundColor: '#2563eb',
//   //   paddingHorizontal: 10,
//   //   paddingVertical: 4,
//   //   borderRadius: 6,
//   //   fontSize: 13,
//   // },
//   card: {
//     flexDirection: 'row',
//     padding: 12,
//     backgroundColor: '#fff',
//     marginHorizontal: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     marginRight: 12,
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: '#111827',
//     color: '#1f2937',
//   },
//   newBadge: {
//     backgroundColor: '#3b82f6',
//     color: '#fff',
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   description: {
//     color: '#6b7280',
//     fontSize: 13,
//     marginVertical: 4,
//   },
//   actionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   likeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   likeText: {
//     marginLeft: 4,
//     fontSize: 13,
//     color: '#374151',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#e5e7eb',
//     marginVertical: 4,
//     marginHorizontal: 10,
//   },
// });









import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const sampleDescriptions = [
  "The battle intensifies as the new villain appears.",
  "Friendships are tested in this gripping episode.",
  "A surprise twist changes everything.",
  "The team journeys through a perilous mountain.",
  "Romantic tensions build up at the academy.",
  "Time travel creates chaos in the timeline.",
  "Power awakens in an unexpected ally.",
  "A heartwarming reunion with old friends.",
  "This episode unveils a hidden past.",
  "Rivalry reaches new heights in this duel.",
];

const dummyData = Array.from({ length: 100 }).map((_, index) => ({
  id: index + 1,
  title: `Anime Episode ${index + 1}`,
  description: sampleDescriptions[index % sampleDescriptions.length],
  isNew: index % 4 === 0,
  image: `https://picsum.photos/seed/${index}/200/200`,
  likeCount: Math.floor(Math.random() * 200),
}));

export default function Home() {
  const [liked, setLiked] = useState({});
  const { darkMode } = useContext(ThemeContext);

  const handleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: darkMode ? '#f3f4f6' : '#1f2937' }]}>
            {item.title}
          </Text>
          {item.isNew && <Text style={styles.newBadge}>NEW</Text>}
        </View>
        <Text style={[styles.description, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
          {item.description}
        </Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity>
            <Text style={{ fontSize: 16 }}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
            <Text style={{ fontSize: 16 }}>❤️</Text>
            <Text style={[styles.likeText, { color: darkMode ? '#e5e7eb' : '#374151' }]}>
              {liked[item.id] ? item.likeCount + 1 : item.likeCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#fff' }]}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={[
              styles.separator,
              { backgroundColor: darkMode ? '#374151' : '#e5e7eb' },
            ]}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  newBadge: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  description: {
    fontSize: 13,
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 4,
    fontSize: 13,
  },
  separator: {
    height: 1,
    marginVertical: 4,
    marginHorizontal: 10,
  },
});
