// TO DO: Create a registration page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
// and store the user information in the database

import { KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'
import { FirebaseAuth,  FirebaseDb, createDocument} from '../Firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [id, setId] = useState('')

  const auth = FirebaseAuth; 
  const db = FirebaseDb;

  const toggleShowPassword = (password) => {
    setShowpassword(!password)
  }

  const handleRegister = () => {
      //  Regex for password validation of at least 8 characters, 1 letter, 1 number, and 1 special character 
    // https://stackoverflow.com/a/21456918/22072623    
    const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    const usernameLengthRegex = /^(?=.{6,20}$)/;
    const usernameCharacterRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    if (!(usernameLengthRegex.test(username))){ 
      alert('Username must be between 6-20 characters');
      return;
    }
    if (!(usernameCharacterRegex.test(username))){
      alert('Invalid special characters in username');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!(validPasswordRegex.test(password))){
      alert('Password must contain at least 8 characters, 1 letter, 1 number, and 1 special character');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const id = user.uid
        console.log(user.email + ' has been registered'); 
        console.log("User ID: " + id);
        setId(id);
       })
      .catch((error) => alert(error.message));
     
    // add user to database
    const newUserObject = {
      username: username,
      email: email,
      newUser: true
    }
    createDocument('users', id, newUserObject);
    navigation.navigate('LoginPage')      
  }

  return (
    <KeyboardAvoidingView>
      <Text>RegisterPage</Text>
      <TextInput 
        placeholder="Username"
        value={username} 
        onChangeText={text => setUsername(text)}
      />
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput 
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={!showPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={!showConfirmPassword}
      />
      <Button title='Register' onPress={handleRegister} />
      <Button title="Return to Login" onPress={() => navigation.goBack()} />
    </KeyboardAvoidingView>
  )
}

export default RegisterPage

const styles = StyleSheet.create({})