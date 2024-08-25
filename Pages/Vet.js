import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Background from '../Background'; // Assuming you have a Background component

const VetScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://192.168.1.54:8082/api/doctors');
                const data = await response.json();
                setDoctors(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleCall = (mobileNumber) => {
        Linking.openURL(`tel:${mobileNumber}`);
    };

    const handleEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleDoctorClick = (doctorId) => {
        navigation.navigate('DoctorSchedule', { doctorId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.doctorContainer} 
            onPress={() => handleDoctorClick(item._id)}
        >
            <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>{item.username}</Text>
                <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                <Text style={styles.doctorAddress}>{item.address}</Text>
                <Text style={styles.doctorEmail}>{item.email}</Text>
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

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    data={doctors}
                    keyExtractor={(item) => item._id}
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
    doctorContainer: {
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
    doctorDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    doctorName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#555',
    },
    doctorAddress: {
        fontSize: 14,
        color: '#777',
    },
    doctorEmail: {
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

export default VetScreen;
