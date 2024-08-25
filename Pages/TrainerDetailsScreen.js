import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Alert, Linking } from 'react-native';
import { Card, Text, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Background from '../Background';

const makeCall = (phoneNumber) => {
  let phoneLink = `tel:${phoneNumber}`;

  Linking.canOpenURL(phoneLink)
    .then(supported => {
      if (!supported) {
        console.log("Can't handle phone link");
      } else {
        return Linking.openURL(phoneLink);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const TrainerDetailScreen = ({ route }) => {
  const { trainer } = route.params;
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleAppointment = () => {
    if (selectedDate && selectedTime) {
      Alert.alert(
        'Appointment Confirmed',
        `You have successfully booked a training session with ${trainer.name} on ${selectedDate} at ${selectedTime}.`
      );
    } else {
      Alert.alert('Error', 'Please select a date and time for your training session.');
    }
  };

  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-left' type='font-awesome' color='#fff' />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => makeCall(trainer.phoneNumber)} style={styles.iconButton}>
            <Icon name='phone' type='font-awesome' color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Implement Chat functionality */ }} style={styles.iconButton}>
            <Icon name='comment' type='font-awesome' color='#fff' />
          </TouchableOpacity>
        </View>
      </View>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>{trainer.name}</Card.Title>
        <Card.Divider />
        <Text style={styles.specialty}>{trainer.description}</Text>
        <View style={styles.specialtyContainer}>
          <Text style={styles.specialtyText}>Specialty:</Text>
          <Text style={styles.specialtyTag}>{trainer.description}</Text>
        </View>

        <View style={styles.appointmentSection}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <View style={styles.dateGrid}>
            {weekDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dateButton, selectedDate === day && styles.selectedButton]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[styles.dateText, selectedDate === day && styles.selectedText]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Select Time</Text>
          <FlatList
            horizontal
            data={availableTimes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.timeButton, selectedTime === item && styles.selectedButton]}
                onPress={() => setSelectedTime(item)}
              >
                <Text style={[styles.timeText, selectedTime === item && styles.selectedText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          <Button
            title="Book Training Session"
            onPress={handleAppointment}
            buttonStyle={styles.bookButton}
          />
        </View>
      </Card>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 24,
    color: '#333',
  },
  specialty: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
  },
  specialtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 10,
  },
  specialtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    marginRight: 10,
  },
  specialtyTag: {
    fontSize: 16,
    color: '#004d40',
    fontStyle: 'italic',
  },
  appointmentSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  dateText: {
    fontSize: 16,
    color: '#00796b',
  },
  timeText: {
    fontSize: 16,
    color: '#00796b',
  },
  selectedText: {
    color: '#fff',
  },
  bookButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
});

export default TrainerDetailScreen;
