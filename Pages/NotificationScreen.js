import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Background from '../Background'; // Ensure this path is correct

const NotificationScreen = ({ navigation }) => {
  const [isGeneralEnabled, setIsGeneralEnabled] = useState(false);
  const [isPromotionalEnabled, setIsPromotionalEnabled] = useState(false);
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);

  const toggleGeneral = () => setIsGeneralEnabled(previousState => !previousState);
  const togglePromotional = () => setIsPromotionalEnabled(previousState => !previousState);
  const toggleUpdate = () => setIsUpdateEnabled(previousState => !previousState);

  return (
    <Background>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notification Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>

          <View style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.settingText}>General Notifications</Text>
            <Switch
              onValueChange={toggleGeneral}
              value={isGeneralEnabled}
              thumbColor={isGeneralEnabled ? "#4cd137" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>

          <View style={styles.settingItem}>
            <MaterialIcons name="local-offer" size={24} color="black" />
            <Text style={styles.settingText}>Promotional Notifications</Text>
            <Switch
              onValueChange={togglePromotional}
              value={isPromotionalEnabled}
              thumbColor={isPromotionalEnabled ? "#4cd137" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>

          <View style={styles.settingItem}>
            <Ionicons name="refresh-circle-outline" size={24} color="black" />
            <Text style={styles.settingText}>Updates Notifications</Text>
            <Switch
              onValueChange={toggleUpdate}
              value={isUpdateEnabled}
              thumbColor={isUpdateEnabled ? "#4cd137" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>

        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'linear-gradient(to right, rgba(84, 116, 84, 0.5), rgba(116, 85, 116, 0.5))',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default NotificationScreen;
