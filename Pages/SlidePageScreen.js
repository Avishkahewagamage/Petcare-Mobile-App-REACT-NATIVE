import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import Background from '../Background'; // Ensure this path is correct

const SlidePageScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('HomeScreen');
    }, 5000);
  };

  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>File Manager</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF3C00" />
          </View>
        )}
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Ionicons name="person-outline" size={30} color="black" />
            <Text style={styles.buttonText}>Accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Shop')}
          >
            <Ionicons name="cart-outline" size={30} color="black" />
            <Text style={styles.buttonText}>Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('SettingScreen')}
          >
            <Ionicons name="settings-outline" size={30} color="black" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('AdoptionMapScreen')}
          >
            <Ionicons name="heart-outline" size={30} color="black" />
            <Text style={styles.buttonText}>Adoption</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('InformationScreen')}
          >
            <Ionicons name="information-circle-outline" size={30} color="black" />
            <Text style={styles.buttonText}>Information</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Adjust as needed to ensure content isn't cut off at the bottom
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    marginBottom: 20,
    width: '80%',
    borderRadius: 30, // Adjust border radius as needed
    backgroundColor: '#F6FA00', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
    height: 100, // Example height
  },
  buttonText: {
    color: 'black', // Changed to black
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SlidePageScreen;
