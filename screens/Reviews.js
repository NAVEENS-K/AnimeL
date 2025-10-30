import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import SpoilerText from '../components/SpoilerText';

const Reviews = () => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleAdd = () => {
    if (review.trim()) {
      setReviews([...reviews, { id: Date.now().toString(), text: review }]);
      setReview('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 User Reviews</Text>
      <TextInput
        value={review}
        onChangeText={setReview}
        placeholder="Write your thoughts..."
        placeholderTextColor="#888"
        style={styles.input}
        multiline
      />
      <Button title="Submit Review" onPress={handleAdd} />
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewList}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
        )}
      />
      <SpoilerText text="This character dies in episode 10!" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 60,
  },
  reviewList: { marginTop: 10 },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  reviewText: { fontSize: 16 },
});

export default Reviews;
