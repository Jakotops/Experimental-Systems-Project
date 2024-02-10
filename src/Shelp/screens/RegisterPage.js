// TO DO: Create a registration page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
// and store the user information in the database

import { KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'



const RegisterPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  return (
    <KeyboardAvoidingView>
      <Text>RegisterPage</Text>
      <TextInput 
        placeholder="First Name"

      />
      <TextInput 
        placeholder="Last Name"
      />
      <TextInput 
        placeholder="Username"
      />
      <TextInput 
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Button title='Register' onPress={() => navigation.navigate('LoginPage')} />
      <Button title="Return to Login" onPress={() => navigation.goBack()} />
    </KeyboardAvoidingView>
  )
}

export default RegisterPage

const styles = StyleSheet.create({})