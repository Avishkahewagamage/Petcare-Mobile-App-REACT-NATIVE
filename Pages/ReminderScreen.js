import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import Background from '../Background';  // Ensure Background component is defined or replace it with a <View> component if not available
import DateTimePicker from '@react-native-community/datetimepicker';

const ReminderScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        const reminderDate = new Date(`${reminder.date}T${reminder.time}:00`);
        if (
          reminderDate.getDate() === now.getDate() &&
          reminderDate.getMonth() === now.getMonth() &&
          reminderDate.getFullYear() === now.getFullYear() &&
          reminderDate.getHours() === now.getHours() &&
          reminderDate.getMinutes() === now.getMinutes()
        ) {
          Alert.alert('Reminder Alert', `It's time for: ${reminder.name}`);
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [reminders]);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://192.168.1.54:3000/api/reminders');
      const contentType = response.headers.get('content-type');
  
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setReminders(data);
      } else {
        console.error('Expected JSON but received:', contentType);
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleAddReminder = async () => {
    try {
      const response = await fetch('http://192.168.1.54:3000/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          date: selectedDate,
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        }),
      });

      if (response.ok) {
        fetchReminders();
        setName('');
        setDescription('');
        setSelectedDate('');
        setTime(new Date());
      } else {
        console.error('Error adding reminder');
      }
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const handleUpdateReminder = async (id) => {
    const reminderData = {
      name,
      description,
      date: selectedDate,
      time: time.toTimeString().split(' ')[0],
    };
  
    try {
      const response = await fetch(`http://192.168.1.54:3000/api/reminders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminderData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        throw new Error('Failed to update reminder');
      }
  
      alert('Reminder updated successfully!');
      fetchReminders(); // Refresh reminders list
    } catch (error) {
      console.error('Error updating reminder:', error);
      alert('Error updating reminder. Please try again.');
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.54:3000/api/reminders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchReminders();
      } else {
        console.error('Error deleting reminder');
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <Background style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Reminder</Text>
        <Calendar
          style={styles.calendar}
          current={Date()}
          minDate={'2012-05-10'}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true } }}
        />
        <TouchableOpacity style={styles.timeContainer} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timeText}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Reminder Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, styles.inputDescription]}
            placeholder="Reminder Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>

        {/* Render reminders */}
        {reminders.map((reminder) => (
          <View key={reminder._id} style={styles.reminderItem}>
            <Text style={styles.reminderText}>{reminder.name}</Text>
            <Text style={styles.reminderText}>{reminder.description}</Text>
            <Text style={styles.reminderText}>{reminder.date} {reminder.time}</Text>
            <TouchableOpacity onPress={() => handleUpdateReminder(reminder._id)}>
              <FontAwesome name="edit" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteReminder(reminder._id)}>
              <FontAwesome name="trash" size={28} paddingHorizontal={10} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange', // Setting the background color to orange
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 20,
  },
  timeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#eef',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputDescription: {
    height: 60,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  reminderItem: {
    backgroundColor: '#fff',
    paddingBottom: 55,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderText: {
    flex: 1,
    marginRight: 10,
  },
});

export default ReminderScreen;
