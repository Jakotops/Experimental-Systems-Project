// TO DO: Create a login page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
import { TextInput, StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FirebaseAuth } from '../Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginPage = ({navigation}) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = FirebaseAuth;

  // Login as a developer
  const DevLogin = () => {
    signInWithEmailAndPassword(auth, 'Dev@Dev.com', 'Dev1234!')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user.email)
      navigation.navigate('Authenticated')
    })
    .catch((error) => alert(error.message));
  }

  // Login in as a user
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email)
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
      <Button 
        title='Dev Login' 
        onPress={DevLogin} />
    </KeyboardAvoidingView>
  )
}

export default LoginPage

const styles = StyleSheet.create({})