import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Background from '../Background'; // Ensure this path is correct

const Account = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
          <FontAwesome name="user-circle-o" size={24} color="white" style={styles.accountIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('ProfileScreen')} // Navigate to Flash1 on press
          >
            <Image
              source={require('../assets/image3.jpeg')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Kitty</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('ProfileScreen')} // Navigate to Flash2 on press
          >
            <Image
              source={require('../assets/image3.jpeg')}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Tommy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('SignUpScreen')} // Navigate to AnotherPage on press
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'linear-gradient(to right, rgba(84, 116, 84, 0.5), rgba(116, 85, 116, 0.5))',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Add padding to avoid overlapping with the header
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white', // Set the title color to white
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 60, // Make the button container round
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image round
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100, 
    backgroundColor: '#FFA500', 
    borderColor: 'white', 
    borderWidth: 4, 
    borderRadius: 30,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  accountIcon: {
    marginRight: 10,
  },
});

export default Account;
