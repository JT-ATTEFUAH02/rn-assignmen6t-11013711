import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart !== null) setCart(JSON.parse(cart));
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      if (cart !== null) {
        cart = JSON.parse(cart);
        cart = cart.filter((item) => item.id !== product.id);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
  };

  return (
    <View style={styles.container}>
      <Header title="Checkout" />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem item={item} removeFromCart={removeFromCart} />
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Est. Total: ${calculateTotal()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  totalContainer: {
    padding: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
