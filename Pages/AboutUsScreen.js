import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Background from '../Background'; // Ensure this path is correct
import { Icon } from 'react-native-elements';

const AboutUsScreen = ({ navigation }) => {
  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" type="font-awesome" color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>About Us</Text>
        </View>

        <View style={styles.section}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.sectionImage}
          />
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            Our mission is to revolutionize the agricultural sector by connecting farmers directly with consumers, 
            reducing intermediaries, and promoting sustainable farming practices. We aim to empower farmers with 
            the tools and knowledge they need to maximize their productivity and profits.
          </Text>
        </View>

        <View style={styles.section}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.sectionImage}
          />
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.sectionText}>
            We envision a world where agriculture is not just a means of livelihood, but a way of life that sustains 
            communities, nurtures the environment, and ensures food security for future generations.
          </Text>
        </View>

        <View style={styles.section}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.sectionImage}
          />
          <Text style={styles.sectionTitle}>Our Values</Text>
          <Text style={styles.sectionText}>
            Integrity, sustainability, innovation, and community are the core values that drive everything we do. 
            We are committed to maintaining the highest ethical standards, fostering innovation, and working closely 
            with our communities to achieve common goals.
          </Text>
        </View>

        <View style={styles.section}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.sectionImage}
          />
          <Text style={styles.sectionTitle}>Pet Care Commitment</Text>
          <Text style={styles.sectionText}>
            At our core, we believe in providing the best care for your pets. Our platform connects you with expert veterinarians 
            and pet care professionals who are dedicated to ensuring your pets are healthy, happy, and well-cared for. 
            From regular check-ups to emergency care, we offer a comprehensive range of services tailored to meet the needs 
            of your beloved pets.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => navigation.navigate('ContactUsScreen')}
        >
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  section: {
    marginBottom: 20,
  },
  sectionImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  contactButton: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AboutUsScreen;
