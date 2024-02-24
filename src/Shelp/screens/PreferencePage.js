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
  <SafeAreaView style={{ flex: 1 }}>
    <Stack.Navigator>
      <Stack.Screen name="Preference" component={DoubleList} options={{ headerShown: false }} />
      <Stack.Screen name="DietCard" component={DietCard} />
      <Stack.Screen name="ProductCardTest" component={ProductCard} />
    </Stack.Navigator>
  </SafeAreaView>
  )
}

export default PreferencePage

const styles = StyleSheet.create({})
