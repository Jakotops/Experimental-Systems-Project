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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Product Name</Text>
      </View>
      <Text style={[styles.text]}>Product Image</Text>
      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Nutrional Value</Text>
      </View>
      {nutr.map((item, index) => (
        <Text style={[styles.text]}>{item.name}</Text>
      ))}
      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>
      {ingr.map((item, index) => (
        <Text style={[styles.text]}>{item.name}</Text>
      ))}
    </SafeAreaView>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    padding: 20,
  },
  titleContainer: {
    backgroundColor: '#f19a33', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20, 
    borderWidth: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    textAlign: 'center', 
  },
  subtitleContainter: {
    backgroundColor: 'lightgray', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 20, 
    borderWidth: 1, 
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    alignItems: 'center', 
  },
  text: {
    fontSize: 12,
  }
})