// TO DO: Create a registration page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
// and store the user information in the database

import { KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'
import { FirebaseAuth } from '../Firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";


const RegisterPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  const auth = FirebaseAuth; 

  const handleRegister = () => {
    if (password !== ConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    //  Regex for password validation of at least 8 characters, 1 letter, 1 number, and 1 special character 
    // https://stackoverflow.com/a/21456918/22072623    

    const validRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!(validRegex.test(password))){
      alert('Password must contain at least 8 characters, 1 letter, 1 number, and 1 special character');
      return;
    }
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email + ' has been registered'); 
        navigation.navigate('LoginPage')    
       })
      .catch((error) => alert(error.message));
  }

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
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={ConfirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button title='Register' onPress={handleRegister} />
      <Button title="Return to Login" onPress={() => navigation.goBack()} />
    </KeyboardAvoidingView>
  )
}

export default RegisterPage

const styles = StyleSheet.create({})