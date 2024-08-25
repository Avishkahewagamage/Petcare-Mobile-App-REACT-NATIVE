import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Background from '../Background';

const SignUpScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    type: '',
    breed: '',
    dateOfBirth: '',
    gender: '',
    color: ''
  });

  // Retrieve the token from AsyncStorage
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert('Error', 'No token found. Please log in again.');
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.error('Error retrieving token:', error.message);
        Alert.alert('Error retrieving token');
      }
    };

    fetchToken();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      setFormData({ ...formData, image: imageUri });
    } else {
      console.error("No image URI found or operation was cancelled.");
    }
  };

  const handleInputChange = (name, value) => {
    let updatedValue = value;
    if (name === 'dateOfBirth') {
      updatedValue = parseInt(value, 10);
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: updatedValue
    }));
  };

  const handleSignUp = async () => {
    if (!token) {
      Alert.alert('Error', 'No token available. Please log in.');
      return;
    }

    const signUpEndpoint = 'http://192.168.1.54:3000/pets/add';

    try {
      let requestBody = new FormData();
      
      Object.keys(formData).forEach(key => {
        requestBody.append(key, formData[key]);
      });

      if (image) {
        requestBody.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'photo.jpg', // Update with appropriate file name
        });
      }

      const response = await fetch(signUpEndpoint, {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data',
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Pet added successful:', responseData);

      Alert.alert('Pet added successful');
      navigation.navigate('ServiceScreen');
    } catch (error) {
      console.error('Error during sign up:', error.message);
      Alert.alert('Error during sign up');
    }
  };

  return (
    <Background>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}
            {!image && <FontAwesome name='camera' size={34} color="black" />}
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Pet Name"
            onChangeText={(value) => handleInputChange('petName', value)}
            value={formData.petName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Select Your Pet Type"
            onChangeText={(value) => handleInputChange('type', value)}
            value={formData.type}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Select Your Pet Breed"
            onChangeText={(value) => handleInputChange('breed', value)}
            value={formData.breed}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Date of Birth"
            onChangeText={(value) => handleInputChange('dateOfBirth', value)}
            value={formData.dateOfBirth}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Select Your Pet Gender"
            onChangeText={(value) => handleInputChange('gender', value)}
            value={formData.gender}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Color"
            onChangeText={(value) => handleInputChange('color', value)}
            value={formData.color}
          />
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 0,
    alignItems: 'center',
    height: 100,
  },
  logo: {
    height: '100%',
    resizeMode: 'cover',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  textInput: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 0,
    borderColor: '#ddd',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  signUpButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default SignUpScreen;
