// TO DO: Create a registration page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
// and store the user information in the database

import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'


const RegisterPage = ({ navigation }) => {
  return (
    <View>
      <Text>RegisterPage</Text>
      <Button title='Register' onPress={() => navigation.navigate('LoginPage')} />
      <Button title="Return to Login" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default RegisterPage

const styles = StyleSheet.create({})