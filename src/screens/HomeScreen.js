import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from '../components/Product';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
  const [products] = useState([
    { id: '1', name: 'Reversible Angora Cardigan', price: '$120' },
    { id: '2', name: 'Lopo Reversible Cardigan', price: '$120' },
    { id: '3', name: 'Office Wear Lamerei', price: '$120' },
  ]);

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      if (cart === null) cart = [];
      else cart = JSON.parse(cart);
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Our Story" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product product={item} addToCart={addToCart} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
