import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Background from '../Background'; // Ensure this path is correct

const SettingScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
    setShowNotificationOptions(false); // Close options when toggling notifications
  };

  const toggleNotificationOptions = () => {
    setShowNotificationOptions(previousState => !previousState);
  };

  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.settingItem} onPress={toggleNotifications}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
              thumbColor={isNotificationsEnabled ? "#4cd137" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </TouchableOpacity>

          {isNotificationsEnabled && (
            <TouchableOpacity style={styles.dropdownItem} onPress={toggleNotificationOptions}>
              <Text style={styles.dropdownText}>Configure Notifications</Text>
              <Ionicons
                name={showNotificationOptions ? "chevron-up-outline" : "chevron-down-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )}

          {showNotificationOptions && (
            <View style={styles.notificationOptions}>
              <TouchableOpacity
                style={styles.notificationOption}
                onPress={() => {
                  navigation.navigate('NotificationScreen');
                  setShowNotificationOptions(false); // Close options after navigating
                }}
              >
                <Text style={styles.notificationOptionText}>Notification Settings</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.settingText}>Profile</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ChangePasswordScreen')}>
            <MaterialIcons name="lock-outline" size={24} color="black" />
            <Text style={styles.settingText}>Change Password</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            <Ionicons name="shield-outline" size={24} color="black" />
            <Text style={styles.settingText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('TermsOfServiceScreen')}>
            <MaterialIcons name="gavel" size={24} color="black" />
            <Text style={styles.settingText}>Terms of Service</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('SupportScreen')}>
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <Text style={styles.settingText}>Support</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.logoutText}>Logout</Text>
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
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
  },
  settingItem: {
    width: '90%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  dropdownItem: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationOptions: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  notificationOption: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  notificationOptionText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8E2525',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default SettingScreen;
