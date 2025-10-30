import React from 'react';
import { View, Text, FlatList } from 'react-native';

const dummyShows = [
  { id: '1', title: 'Naruto', category: 'Completed' },
  { id: '2', title: 'Attack on Titan', category: 'Watching' },
  { id: '3', title: 'Jujutsu Kaisen', category: 'Plan to Watch' },
  { id: '4', title: 'Bleach', category: 'Dropped' },
];

const CategoryList = ({ category }) => {
  const filtered = category === 'All' ? dummyShows : dummyShows.filter(show => show.category === category);

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </View>
      )}
    />
  );
};

export default CategoryList;
