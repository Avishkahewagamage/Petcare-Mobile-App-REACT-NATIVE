import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Background from '../Background'; // Ensure this path is correct

const Cart = ({ route }) => {
  const { cart } = route.params;

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.header}>Cart</Text>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemText}>{item.name}</Text>
              <Text style={styles.cartItemText}>${item.price}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.total}>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemText: {
    fontSize: 18,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Cart;
