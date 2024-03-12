// TO DO: Create a card for diet information displaying a list of multiple ingredients using a list component
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const DietCard = ({route}) => {
  const { dietName } = route.params;
  let items = [];
  console.log(dietName);
  // Populate the items array with ingredients
  items = [
    { id: 1, name: 'Ingredient 1' },
    { id: 2, name: 'Ingredient 2' },
    { id: 3, name: '...' },
    // Add more ingredient items here as needed
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{dietName}</Text>
      </View>
      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Blacklisted ingredients:</Text>
      </View>
      <View style={styles.itemContainer}>
        {items.map(item => (
          <Text style={[styles.text]} key={item.id}>{item.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default DietCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    padding: 20,
  },
  titleContainer: {
    backgroundColor: '#4bcba3', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20, 
    borderWidth: 1,
  },
  title: {
    fontSize: 68,
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  itemContainer: {
    alignItems: 'center', 
  },
  text: {
    fontSize: 20,
  }
})