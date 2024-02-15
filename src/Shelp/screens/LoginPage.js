// TO DO: Create a login page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
import { TextInput, StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FirebaseAuth } from '../Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginPage = ({navigation}) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const auth = FirebaseAuth;

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('Authenticated')
      })
      .catch((error) => alert(error.message));
    
  }

  return (
    <KeyboardAvoidingView>
      <Text>LoginPage</Text>
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button 
        title="Login"
        onPress={handleLogin}
      />
      <Button title='Register' onPress={() => navigation.navigate('RegisterPage')} />
    </KeyboardAvoidingView>
  )
}

export default LoginPage

const styles = StyleSheet.create({})