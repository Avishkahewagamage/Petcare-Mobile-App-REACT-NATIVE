import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../Background'; // Assuming you have a Background component

const TrainerScreen = ({ navigation }) => {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        // Fetch trainers from the API
        fetch('http://192.168.1.54:8084/api/trainers')
            .then(response => response.json())
            .then(data => setTrainers(data)) 
            .catch(error => console.error(error));
    }, []);

    const handleCall = (mobileNumber) => {
        Linking.openURL(`tel:${mobileNumber}`);
    };

    const handleEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleTrainerClick = (trainerId) => {
        navigation.navigate('TrainerScheduleScreen', { trainerId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.trainerItem}
            onPress={() => handleTrainerClick(item._id)}
        >
            <View style={styles.trainerDetails}>
                <Text style={styles.trainerName}>{item.username}</Text>
                <Text style={styles.trainerSpecialty}>{item.specialty}</Text>
                <Text style={styles.trainerAddress}>{item.address}</Text>
                <Text style={styles.trainerEmail}>{item.email}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleCall(item.mobileNumber)} style={styles.iconButton}>
                    <Icon name="call-outline" size={30} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEmail(item.email)} style={styles.iconButton}>
                    <Icon name="mail-outline" size={30} color="#007bff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    data={trainers}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'transparent',
    },
    list: {
        paddingBottom: 16,
    },
    trainerItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    trainerDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    trainerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    trainerSpecialty: {
        fontSize: 14,
        color: '#555',
    },
    trainerAddress: {
        fontSize: 14,
        color: '#777',
    },
    trainerEmail: {
        fontSize: 14,
        color: '#007bff',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconButton: {
        marginHorizontal: 35,
    },
});

export default TrainerScreen;
