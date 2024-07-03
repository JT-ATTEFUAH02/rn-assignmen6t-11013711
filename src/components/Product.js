import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Product = ({ product, addToCart }) => {
  return (
    <View style={styles.product}>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Product;
