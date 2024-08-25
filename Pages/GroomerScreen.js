import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Background from '../Background'; // Assuming you have a Background component

const GroomerScreen = () => {
    const [groomers, setGroomers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchGroomers = async () => {
            try {
                const response = await fetch('http://192.168.1.54:8083/api/groomers');
                const data = await response.json();
                setGroomers(data);
            } catch (error) {
                console.error('Error fetching groomers:', error);
            }
        };

        fetchGroomers();
    }, []);

    const handleCall = (mobileNumber) => {
        Linking.openURL(`tel:${mobileNumber}`);
    };

    const handleEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleGroomerClick = (groomerId) => {
        navigation.navigate('GroomerSchedule', { groomerId });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.groomerContainer}
            onPress={() => handleGroomerClick(item._id)}
        >
            <View style={styles.groomerInfo}>
                <Text style={styles.groomerName}>{item.username}</Text>
                <Text style={styles.groomerSpecialty}>{item.specialty}</Text>
                <Text style={styles.groomerAddress}>{item.address}</Text>
                <Text style={styles.groomerEmail}>{item.email}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleCall(item.mobileNumber)} style={styles.iconButton}>
                    <Icon name="call-outline" size={30} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEmail(item.email)} style={styles.iconButton}>
                    <Icon name="mail-outline" size={30} color="#4CAF50" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    data={groomers}
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
    groomerContainer: {
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
    groomerInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    groomerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    groomerSpecialty: {
        fontSize: 14,
        color: '#555',
    },
    groomerAddress: {
        fontSize: 14,
        color: '#777',
    },
    groomerEmail: {
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

export default GroomerScreen;
