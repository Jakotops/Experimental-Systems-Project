// TO DO: Create a card for diet information displaying a list of multiple ingredients using a list component
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const DietCard = ({route}) => {
  const { dietName } = route.params;
  let items = [];
  // Populate the items array with ingredients
  items = [
    { id: 1, name: 'Ingredient 1' },
    { id: 2, name: 'Ingredient 2' },
    { id: 3, name: '...' },
    // Add more ingredient items here as needed
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{ dietName }</Text>
      <Text style={styles.subtitle}>Blacklisted ingredients:</Text>
      {items.map((item, index) => (
        <Text>{item.name}</Text>
      ))}
    </SafeAreaView>
  )
}

export default DietCard

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