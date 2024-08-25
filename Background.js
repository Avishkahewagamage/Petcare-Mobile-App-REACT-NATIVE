import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require('./assets/Backgound.jpg')} // Replace with your image path
      style={styles.background}
      resizeMode="cover" // Cover the whole screen
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    top: 60,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Background;
