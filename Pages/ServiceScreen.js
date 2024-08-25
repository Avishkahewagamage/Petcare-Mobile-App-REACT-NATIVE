import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../Background';

const ServiceScreen = () => {
  const navigation = useNavigation();
  const [bloomed, setBloomed] = useState(false);

  const handleChatBotPress = () => {
    setBloomed(!bloomed); // Toggle bloomed state
  };

  const navigateToService = (service) => {
    navigation.navigate(service); // Ensure service matches your route names
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        {!bloomed && (
          <>
            <TouchableOpacity style={styles.circleContainer} onPress={() => navigation.navigate('SlidePageScreen')}>
              <Image
                source={require('../assets/IMG-20231117-WA0022.jpg')} // Replace with your circle image path
                style={styles.circleImage}
              />
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('Vet')}>
                <Text style={styles.optionText}>Veterinary surgeon</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('TrainerScreen')}>
                <Text style={styles.optionText}>Trainer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => navigateToService('GroomerScreen')}>
                <Text style={styles.optionText}>Grooming</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.chatbotButton} onPress={handleChatBotPress}>
          <Image
            source={require('../assets/HealthIcon.png')} // Replace with your chatbot image path
            style={styles.chatbotIcon}
          />
        </TouchableOpacity>

        {bloomed && (
          <>
            <View style={styles.overlay}>
              <View style={styles.bloomContainer}>
                <TouchableOpacity style={[styles.bloomButton, styles.firstBlooming]} onPress={() => navigateToService('Vet')}>
                  <Image
                    source={require('../assets/vetIcon.png')} // Replace with your first blooming image path
                    style={styles.bloomIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bloomButton, styles.secondBlooming]} onPress={() => navigateToService('GroomerScreen')}>
                  <Image
                    source={require('../assets/GrromIcon.png')} // Replace with your second blooming image path
                    style={styles.bloomIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bloomButton, styles.thirdBlooming]} onPress={() => navigateToService('TrainerScreen')}>
                  <Image
                    source={require('../assets/Trainer.png')} // Replace with your third blooming image path
                    style={styles.bloomIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloomContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloomButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloomIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  firstBlooming: {
    bottom: 70,
    left: -40,
    width: '50%',
    height: '50%',
  },
  secondBlooming: {
    bottom: 190,
    left: 30,
    width: '50%',
    height: '50%',
  },
  thirdBlooming: {
    bottom: 70,
    left: 100,
    width: '50%',
    height: '50%',
  },
  optionsContainer: {
    marginTop: 200, // Adjust this to position the options correctly
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    width: '80%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ServiceScreen;
