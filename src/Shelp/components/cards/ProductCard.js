// TO DO: Create a card for product information using the user database of scanned items

import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const ProductCard = () => {
  let nutr = [];
  let ingr = [];

  nutr = [
    { name: 'Energy: g' },
    { name: 'Fat: g' },
    { name: 'Carbs: g' },
    { name: 'Salt: g' },
    {name: 'Sugars: g' },
    { name: 'Saturate: g' },
  ];

  ingr = [
    { name: 'Ingredient 1' },
    { name: 'Ingredient 2' },
    { name: '...' },
  ];
  return (
    <SafeAreaView>
      <Text style={styles.title}>Product Name</Text>
      <Text style={styles.subtitle}>Product Image</Text>
      <Text>Image</Text>
      <Text style={styles.subtitle}>Nutrional Value</Text>
      {nutr.map((item, index) => (
        <Text>{item.name}</Text>
      ))}
      <Text style={styles.subtitle}>Ingredients</Text>
      {ingr.map((item, index) => (
        <Text>{item.name}</Text>
      ))}
    </SafeAreaView>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    fontSize: 16,
    marginBottom: 4,
  },
})