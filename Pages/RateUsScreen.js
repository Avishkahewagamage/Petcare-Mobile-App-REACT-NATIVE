import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { AirbnbRating, Button } from 'react-native-elements';
import Background from '../Background'; // Ensure this path is correct

const RateUsScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRatingComplete = (ratingValue) => {
    setRating(ratingValue);
  };

  const submitRating = () => {
    if (rating > 0) {
      setLoading(true);
      // Simulate an API call or processing
      setTimeout(() => {
        setLoading(false);
        alert(`Thank you for rating us ${rating} stars!`);
        navigation.goBack(); // Navigate back after submission
      }, 2000);
    } else {
      alert('Please select a rating before submitting.');
    }
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Rate Us</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>We'd love to hear your feedback!</Text>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
            defaultRating={0}
            size={40}
            onFinishRating={handleRatingComplete}
            selectedColor='#FFD700'
          />
        </View>

        <TextInput
          style={styles.feedbackInput}
          placeholder="Write your feedback here..."
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />
        ) : (
          <Button
            title="Submit Rating"
            buttonStyle={styles.submitButton}
            onPress={submitRating}
          />
        )}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    flex: 1,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  feedbackInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
  },
  loading: {
    marginTop: 30,
  },
});

export default RateUsScreen;
