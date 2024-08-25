import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background from '../Background'; // Ensure this path is correct

const TermsOfServiceScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View />
      </View>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.text}>
            Welcome to our Terms of Service page! These terms outline the rules and regulations for the use of our app.
            By accessing this app, we assume you accept these terms and conditions. Do not continue to use the app if you
            do not agree to all of the terms and conditions stated on this page.
          </Text>
          <Text style={styles.subtitle}>1. Introduction</Text>
          <Text style={styles.text}>
            These terms and conditions govern your use of this app; by using this app, you accept these terms and conditions
            in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not
            use this app.
          </Text>
          <Text style={styles.subtitle}>2. License to Use</Text>
          <Text style={styles.text}>
            Unless otherwise stated, we or our licensors own the intellectual property rights in the app and material on the
            app. Subject to the license below, all these intellectual property rights are reserved.
          </Text>
          <Text style={styles.text}>
            You may view, download for caching purposes only, and print pages from the app for your own personal use, subject
            to the restrictions set out below and elsewhere in these terms and conditions.
          </Text>
          <Text style={styles.subtitle}>3. Acceptable Use</Text>
          <Text style={styles.text}>
            You must not use this app in any way that causes, or may cause, damage to the app or impairment of the availability
            or accessibility of the app; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with
            any unlawful, illegal, fraudulent or harmful purpose or activity.
          </Text>
          <Text style={styles.text}>
            You must not use this app to copy, store, host, transmit, send, use, publish or distribute any material which
            consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other
            malicious computer software.
          </Text>
          <Text style={styles.subtitle}>4. Restricted Access</Text>
          <Text style={styles.text}>
            Access to certain areas of this app is restricted. We reserve the right to restrict access to other areas of this
            app, or indeed this entire app, at our discretion.
          </Text>
          <Text style={styles.text}>
            If we provide you with a user ID and password to enable you to access restricted areas of this app or other
            content or services, you must ensure that the user ID and password are kept confidential.
          </Text>
          <Text style={styles.subtitle}>5. Changes to Terms</Text>
          <Text style={styles.text}>
            We may revise these terms and conditions from time to time. Revised terms and conditions will apply to the use of
            this app from the date of publication of the revised terms and conditions on this app. Please check this page
            regularly to ensure you are familiar with the current version.
          </Text>
          <Text style={styles.subtitle}>6. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms, please contact us at: support@example.com.
          </Text>
          <Text style={styles.text}>
            Thank you for taking the time to read our Terms of Service.
          </Text>
        </View>
      </ScrollView>
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
});

export default TermsOfServiceScreen;
