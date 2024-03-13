// TO DO: Create a card for diet information displaying a list of multiple ingredients using a list component
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import dietJson from '../../Diets.json';

import React from 'react'

const DietCard = ({route}) => {
  const { dietName, banned_ingredients } = route.params;



  let items = [];
  console.log(dietName);
  console.log(banned_ingredients);
  for (let i = 0; i < banned_ingredients.length; i++) {
    items.push({ name: banned_ingredients[i].replace(/\b\w/g, l => l.toUpperCase()), id: i });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{dietName.replace(/\b\w/g, l => l.toUpperCase())}</Text>
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
    backgroundColor: 'orange', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20, 
    borderWidth: 1,
  },
  title: {
    fontSize: 60,
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
    fontSize: 30,
  }
})