import { View, Text } from 'react-native'
import LoginPage from '../screens/LoginPage'
import RegisterPage from '../screens/RegisterPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

function NonAuthenticatedStack(){
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName='Login'
    >
      <Stack.Screen options={{headerShown: false}} name="LoginPage" component={LoginPage} />
      <Stack.Screen options={{headerShown: false}} name="RegisterPage" component={RegisterPage} />
    </Stack.Navigator>
  );
}


const NonAuthenticated = () => {
  return (
    <NonAuthenticatedStack />
  )
}

export default NonAuthenticated