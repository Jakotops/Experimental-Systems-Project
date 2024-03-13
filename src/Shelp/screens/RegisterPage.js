// TO DO: Create a registration page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
// and store the user information in the database

import { KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import React, {useState} from 'react'
import { FirebaseAuth } from '../Firebase/Firebase'
import { createDocument } from '../Firebase/FirestoreFunctions'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../assets/logo.png"

const RegisterPage = ({ navigation }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const auth = FirebaseAuth; 

  const handleRegister = () => {
      //  Regex for password validation of at least 8 characters, 1 letter, 1 number, and 1 special character 
    // https://stackoverflow.com/a/21456918/22072623    
    const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    const usernameLengthRegex = /^(?=.{6,20}$)/;
    const usernameCharacterRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    // Password validation conditions
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
    
    // Register user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const createdId = user.uid
        const newUserObject = {
          username: username,
          email: email,
          newUser: true,
          diets: [],
          ingredients: []
        }
        createDocument('users', createdId, newUserObject);
        navigation.navigate('LoginPage');
       })
      .catch((error) => alert(error.message));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          </View>

          <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Your New Username"
            value={username} 
            onChangeText={text => setUsername(text)}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Your New Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={!showConfirmPassword}
          />
          </View>

          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.returnButton}>
            <Text style={styles.returnButtonText}>Return to Login</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        );
      }


export default RegisterPage

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    resizeMode: "contain",
  },

  logoContainer: {
    alignItems: 'center', // Center the content horizontally
    marginBottom: 40,
    width: "100%",
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white', // Add a background color to the login page#FAF9F6
  },

  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },

  inputLabel: {
  },

  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderBottomColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#FFFFFF', // Add a background color to the input fields
  },

  registerButton: {
    width: '80%',
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },

  registerButtonText: {
    color: 'white', // Add color for text
    textAlign: 'center',
    fontWeight: 'bold', // Example font weight (adjust as needed)
    fontSize: 16,
  },

  returnButton: {
    width: '80%',
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center', 
  },

  returnButtonText: {
    color: 'white', // Add color for text
    textAlign: 'center',
    fontWeight: 'bold', // Example font weight (adjust as needed)
    fontSize: 16,
  },
})