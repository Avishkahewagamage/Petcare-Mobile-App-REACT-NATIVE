import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For picking images
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../Background'; // Ensure this is the correct import path

const EditPetScreen = ({ route, navigation }) => {
  const { pet } = route.params; // Get the pet data from the navigation params

  const [token, setToken] = useState(null);
  const [name, setName] = useState(pet.petName);
  const [breed, setBreed] = useState(pet.breed);
  const [dateOfBirth, setDateOfBirth] = useState(pet.dateOfBirth);
  const [gender, setGender] = useState(pet.gender);
  const [color, setColor] = useState(pet.color);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!token) return;

    const formData = new FormData();
    formData.append('petName', name);
    formData.append('breed', breed);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('gender', gender);
    formData.append('color', color);

    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }

    try {
      const response = await fetch(`http://192.168.1.54:3000/pets/update/${pet._id}`, {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Pet updated successfully:', data);
      // Navigate to the ProfileScreen after the pet is updated
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image source={{ uri: `http://192.168.1.54:3000/${pet.imagePath}` }} style={styles.image} />
          )}
          <Button title="Change Image" onPress={pickImage} />
        </View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={breed}
          onChangeText={setBreed}
          placeholder="Breed"
        />
        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="Date of Birth"
        />
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Gender"
        />
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Color"
        />
        <Button title="Update Pet" onPress={handleUpdate} />
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default EditPetScreen;
