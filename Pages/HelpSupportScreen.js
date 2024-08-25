import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Background from '../Background'; // Ensure this path is correct

const HelpSupportScreen = ({ navigation }) => {
  return (
    <Background>
      <ScrollView>

      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
});

export default HelpSupportScreen;
