import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/IMG-20231106-WA0001.jpg')} // Replace with your actual logo path
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to Click Pet</Text>
      <Image
        source={require('../assets/IMG-20231117-WA0018.jpg')} // Replace with your pets image path
        style={styles.petsImage}
      />
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('PetOwnerSignup')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>All rights reserved @ 2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 0,
  },
  logo: {
    height: 100,
    resizeMode: 'cover',
    marginTop: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  petsImage: {
    height: 200, // Adjust the height accordingly
    width: '100%', // Take the full width of the container
    resizeMode: 'cover', // Cover the area without stretching
    marginVertical: 20,
  },
  getStartedButton: {
    backgroundColor: 'orange', // Use the color according to your theme
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white', // Choose a color that contrasts with the button color
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'blue', // Use a color to indicate tappable text
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    position: 'absolute',
    bottom: 20,
  },
});

export default HomeScreen;