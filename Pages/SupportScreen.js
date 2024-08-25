import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background from '../Background'; // Ensure this path is correct

const SupportScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View />
      </View>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Support</Text>
          <Text style={styles.text}>
            If you need any help, feel free to reach out to us. We are here to assist you with any issues or questions you may have.
          </Text>
          <Text style={styles.subtitle}>Contact Us</Text>
          <Text style={styles.text}>
            Email: support@example.com
          </Text>
          <Text style={styles.text}>
            Phone: +123 456 7890
          </Text>
          <Text style={styles.text}>
            Address: 123 Support Street, Help City, Country
          </Text>
          <Text style={styles.subtitle}>FAQs</Text>
          <Text style={styles.text}>
            Check our Frequently Asked Questions to find quick answers to common issues.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.chatbotButton} onPress={() => navigation.navigate('ChatBotScreen')}>
        <Image 
          source={require('../assets/ChatBot.png')} 
          style={styles.chatbotIcon} 
        />
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(84, 116, 84, 0.5)',
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
  scrollView: {
    backgroundColor: 'transparent',
  },
  container: {
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2c3e50',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 10,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  chatbotIcon: {
    width: 60,
    height:60,
  },
});

export default SupportScreen;
