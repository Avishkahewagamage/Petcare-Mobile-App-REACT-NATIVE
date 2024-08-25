import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/IMG-20231106-WA0001.jpg')} // replace with the path to your logo
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 500, // Set the width of your logo
    height: 500, // Set the height of your logo
    resizeMode: 'cover',
  },
});

export default SplashScreen;
