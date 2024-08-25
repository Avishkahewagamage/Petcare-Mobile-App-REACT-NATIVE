import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../Background'; // Ensure this is the correct import path

const ProfileScreen = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Retrieve the token from AsyncStorage

        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://192.168.1.54:3000/pets/view', {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPets(); // Initial fetch

    const intervalId = setInterval(fetchPets, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const handlePetPress = (pet) => {
    navigation.navigate('PetDetailScreen', { pet }); // Pass the pet data to the detail screen
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.petSection} onPress={() => handlePetPress(item)}>
      <Image
        source={{ uri: `http://192.168.1.54:3000/${item.imagePath}` }} // Adjust to match your image path
        style={styles.petImage}
      />
      <Text style={styles.petName}>{item.petName}</Text>
      <Text style={styles.petDetails}>Breed: {item.breed}</Text>
      <Text style={styles.petDetails}>Date of Birth: {item.dateOfBirth}</Text>
      <Text style={styles.petDetails}>Color: {item.color}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={pets}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  petSection: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { height: 3, width: 0 },
    elevation: 1,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  petDetails: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ProfileScreen;
