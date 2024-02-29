// TO DO: Create a login page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
import { TextInput, StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FirebaseAuth } from '../Firebase/Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginPage = ({navigation}) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = FirebaseAuth;

  const Onboarding = () => {
    signInAsDev()
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User has been logged in and is being onboarded');

        navigation.reset({
          index: 0,
          routes: [{ name: "Authenticated", params: { forceOnboarding: true } }]
        });
      })
      .catch((error) => alert(error.message));
  };

  // Login as a developer
  const DevLogin = () => {
    signInAsDev()
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User has been logged in');
      navigation.reset({
        index: 0,
        routes: [{ name: "Authenticated" }]
      });
    })
    .catch((error) => alert(error.message));
  }

  const signInAsDev = () => signInWithEmailAndPassword(auth, 'Dev@Dev.com', 'Dev1234!');

  // Login in as a user
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.reset({
          index: 0,
          routes: [{ name: "Authenticated" }]
        });
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
      <Button title="Dev Login With Onboarding" onPress={Onboarding} />
    </KeyboardAvoidingView>
  )
}

export default LoginPage

const styles = StyleSheet.create({})