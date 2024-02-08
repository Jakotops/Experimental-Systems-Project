// TO DO: Create a login page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const LoginPage = ({navigation}) => {
  return (
    <View>
      <Text>LoginPage</Text>
      <Button 
        title="Login"
        onPress={() => navigation.navigate('Authenticated', {screen: 'Camera'})}
      />
      <Button title='Register' onPress={() => navigation.navigate('RegisterPage')} />
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({})