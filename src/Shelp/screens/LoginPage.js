// TO DO: Create a login page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
import { TextInput, StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <KeyboardAvoidingView>
      <Text>LoginPage</Text>
      <TextInput 
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button 
        title="Login"
        onPress={() => navigation.navigate('Authenticated', {screen: 'Camera'})}
      />
      <Button title='Register' onPress={() => navigation.navigate('RegisterPage')} />
    </KeyboardAvoidingView>
  )
}

export default LoginPage

const styles = StyleSheet.create({})