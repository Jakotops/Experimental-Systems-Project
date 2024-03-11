// TO DO: Add the settings button to the settings subpage, scanning history button to the history subpage and Logout button to logout the app 
// using firebase authentication

import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import History from './subscreen/History'
import Settings from './subscreen/Settings'
import Menu from './subscreen/Menu'
import ProductCard from '../components/cards/ProductCard'

const ProfilePage = () => {
  const Stack = createNativeStackNavigator(); 
  return (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="Menu" component={Menu} />
    <Stack.Screen name="History" component={History} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="ProductCardTest" component={ProductCard} />
  </Stack.Navigator>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})