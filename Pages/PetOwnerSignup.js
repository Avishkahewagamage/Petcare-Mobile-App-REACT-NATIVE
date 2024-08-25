import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Background from '../Background';

const PetOwnerSignup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  // const [formData, setFormData] = useState({
   
  //   mobileNumber:'',
  //   address:'',
  //   username: '',
  //   email: '',
  //   password: '',

  // });

  // const handleInputChange = (username, value) => {
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [username]: value
  //   }));
  // };

  const handleSignup = async () => {
    try {
        //10.0.2.2
        const response = await fetch('http://192.168.1.54:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, address, mobileNumber, password, }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert('User registered successfully');
        navigation.navigate('LoginScreen');
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error registering user');
    }
};

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')} // Replace with your actual logo path
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder="Username" onChangeText={setUsername} value={username} />
            <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput style={styles.textInput} placeholder="Address" onChangeText={setAddress} value={address} multiline/>
            <TextInput style={styles.textInput} placeholder="Mobile Number" onChangeText={setMobileNumber} value={mobileNumber} keyboardType="phone-pad"/>
            <TextInput style={styles.textInput} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
            
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 40, // Adjust as needed for bottom padding
  },
  logoContainer: {
    marginTop: -100,
    alignItems: 'center',
    marginBottom:-100,
  },
  logo: {
    height: 400,
    width: 500,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 25,
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
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
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: '#ddd',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  signUpButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PetOwnerSignup;
