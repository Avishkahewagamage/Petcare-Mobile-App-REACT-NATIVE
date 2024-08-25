import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../Background'; // Ensure this is the correct import path

const PetDetailScreen = ({ route, navigation }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(route.params.pet); // Initial pet data from route params

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (route.params.pet) {
      setPet(route.params.pet); // Update pet data when route params change
    }
  }, [route.params.pet]);

  const handleEditPress = () => {
    navigation.navigate('EditPetScreen', { pet }); // Navigate to the EditPetScreen with the pet data
  };

  const handleDelete = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://192.168.1.54:3000/pets/delete/${pet._id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Pet deleted successfully:', data);

      // Navigate back to ProfileScreen after deletion
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Pet',
      'Are you sure you want to delete this pet?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: handleDelete, style: 'destructive' },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        {pet.imagePath ? (
          <Image
            source={{ uri: `http://192.168.1.54:3000/${pet.imagePath}` }} // Update the URI to match your server setup
            style={styles.petImage}
            onError={() => console.error('Failed to load image')} // Error handler
          />
        ) : (
          <Text>No image available</Text>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Name: {pet.petName}</Text>
          <Text style={styles.detailText}>Breed: {pet.breed}</Text>
          <Text style={styles.detailText}>Date of Birth: {pet.dateOfBirth}</Text>
          <Text style={styles.detailText}>Gender: {pet.gender}</Text>
          <Text style={styles.detailText}>Color: {pet.color}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.deleteButtonText}>Delete Pet</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { height: 3, width: 0 },
    elevation: 1,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  editButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#00092C', // Blue color, change as needed
    borderRadius: 25,
    alignItems: 'center',
    textDecorationLine: 'underline',
    width: '40%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#B20600', // Red color for delete
    borderRadius: 25,
    alignItems: 'center',
    width: '40%',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetDetailScreen;
