import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Background from '../Background'; // Ensure this path is correct

const adoptionPoints = [
  {
    id: '1',
    title: 'Pet Adoption Center Colombo',
    description: 'A place to adopt pets in Colombo.',
    coordinate: {
      latitude: 6.9271,
      longitude: 79.8612,
    },
  },
  {
    id: '2',
    title: 'Kandy Pet Adoption',
    description: 'A place to adopt pets in Kandy.',
    coordinate: {
      latitude: 7.2906,
      longitude: 80.6337,
    },
  },
  // Add more adoption points as needed
];

const AdoptionMapScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adoption Points</Text>
        <View />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      >
        {adoptionPoints.map((point) => (
          <Marker
            key={point.id}
            coordinate={point.coordinate}
            title={point.title}
            description={point.description}
          />
        ))}
      </MapView>
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
  map: {
    flex: 1,
  },
});

export default AdoptionMapScreen;
