import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Flash1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Flash1.png')} // Ensure this path is correct
        style={styles.petsImage}
      />
      <Text style={styles.title}>WELCOME TO PET CARE APP</Text>
      <Text style={styles.description}>
        Ajhbadsf JHsjdi aiuhsd akjshf igasjuyfd ajhsfjasjm caisuhdnasd a shga jhgf njnabsd jabkd jbadkln
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => navigation.goBack()} // Navigate to the previous screen on press
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.navigate('Flash2')} // Navigate to HomeScreen on press
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  petsImage: {
    width: '100%',
    height: 478,
    flexShrink: 0,
    resizeMode: 'cover',
    marginVertical: 0,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  skipButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Flash1;
