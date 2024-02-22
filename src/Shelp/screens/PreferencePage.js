// TO DO: Load the selected user preferences from the database and show the diet and the ingredients selection using a custom list component

import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import DoubleList from '../components/lists/DoubleList'
import DietCard from '../components/cards/DietCard'
import ProductCard from '../components/cards/ProductCard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const PreferencePage = () => {
  const Stack = createNativeStackNavigator(); 
  return (

  <Stack.Navigator>
    <Stack.Screen name="DoubleList" component={DoubleList} />
    <Stack.Screen name="DietCard" component={DietCard} />
    <Stack.Screen name="ProductCardTest" component={ProductCard} />
  </Stack.Navigator>
  )
}

export default PreferencePage

const styles = StyleSheet.create({})
