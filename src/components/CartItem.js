import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <View style={styles.cartItem}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CartItem;
