// TO DO: Load the selected user preferences from the database and show the diet and the ingredients selection using a custom list component

import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import DoubleList from '../components/lists/DoubleList'
import DietCard from '../components/cards/DietCard'
import ProductCard from '../components/cards/ProductCard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Diets from '../Diets.json'
import Ingredients from '../Ingredients.json'

const PreferencePage = () => {

  const Stack = createNativeStackNavigator(); 
  const dietItems = Object.values(Diets.diets).map(diet => ({ name: diet.name, banned_ingredients: diet.banned_ingredients}));
  const ingredientItems = Object.values(Ingredients.ingredients).map(ingredient => ({ name: ingredient.name }));
  const dietFeatures = [true, true];
  const ingredientFeatures = [true, false];
  return (
  <SafeAreaView style={{ flex: 1 }}>
    <Stack.Navigator>
    <Stack.Screen 
          name="Selection" 
          options={{ headerShown: false }}
        >
          {() => (
            <View style={styles.container}>
            <DoubleList 
              listName1="Diets" 
              listName2="Ingredients" 
              listItems1={dietItems} 
              listItems2={ingredientItems} 
              listFeatures1={dietFeatures} 
              listFeatures2={ingredientFeatures} 
              containerHeight={625}
            />
            </View>
          )}
      </Stack.Screen>
      <Stack.Screen name="Diet Card" component={DietCard} />
    </Stack.Navigator>
  </SafeAreaView>
  )
}

export default PreferencePage

const styles = StyleSheet.create({
  container: { 
    paddingTop: 20,
  },
})
