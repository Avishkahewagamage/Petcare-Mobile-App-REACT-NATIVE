import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../Background';

const GroomerSchedule = ({ route }) => {
    const { groomerId } = route.params;
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroomerSchedule = async () => {
            try {
                const response = await fetch(`http://192.168.1.54:8083/api/schedules/groomer/${groomerId}`);
                const data = await response.json();
                setSchedule(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching groomer schedule:', error);
                setLoading(false);
            }
        };

        fetchGroomerSchedule();
    }, [groomerId]);

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#FFA500" />
                ) : schedule ? (
                    <View style={styles.scheduleContainer}>
                        <Text style={styles.title}>
                            <Icon name="calendar" size={24} color="#4CAF50" /> Schedule {schedule.groomer.username}
                        </Text>
                        {Object.entries(schedule.schedule).map(([day, time]) => (
                            <View key={day} style={styles.dayContainer}>
                                <Text style={styles.dayText}>
                                    <Icon name="clock-o" size={20} color="#555" /> {day}:
                                </Text>
                                <Text style={styles.timeText}>{time}</Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.errorText}>Error loading schedule. Please try again later.</Text>
                )}
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    scheduleContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4CAF50',
        textAlign: 'center',
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dayText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    timeText: {
        fontSize: 18,
        color: '#888',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default GroomerSchedule;
