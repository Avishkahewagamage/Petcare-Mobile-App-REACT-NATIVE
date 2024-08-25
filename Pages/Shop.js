import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://192.168.1.54:8080/api/products/all');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // Initial fetch

        const intervalId = setInterval(fetchProducts, 30000); // Poll every 30 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchProducts(); // Fetch products data when the screen is focused
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image
                            source={{ uri: `http://192.168.1.54:8080/uploads/${item.itemImage}` }}
                            style={styles.image}
                        />
                        <View style={styles.detailsContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.itemName}</Text>
                                <Text style={styles.price}>${item.itemPrice.toFixed(2)}</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton}>
                                <Icon name="cart-plus" type="font-awesome" color="#ffffff" size={20} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.description}>{item.itemDescription}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f9fa',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#7f8c8d',
    },
    productContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginLeft: 20,
    },
    description: {
        fontSize: 14,
        color: '#7f8c8d',
        marginHorizontal: 10,
        marginBottom: 10,
        marginLeft: 30,
    },
    price: {
        fontSize: 16,
        color: '#FFA500',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 20,
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 15,
        marginRight: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA500',
    },
});

export default Shop;
