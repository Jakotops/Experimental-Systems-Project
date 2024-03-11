// TO DO: Create a login page for the app using the following tutorial: https://youtu.be/ql4J6SpLXZA and firebase authentication
import { TextInput, StyleSheet, Text, View, Button, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image  } from 'react-native'
import React, { useState } from 'react'
import { FirebaseAuth } from '../Firebase/Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../assets/logo.png';


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

  const handleForgotPassword = () => {

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      >
        <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput 
          style={styles.input}
          placeholder="Enter Your Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
          />
          
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
          style={styles.input}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.registerButtton}>New User? Register Here</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={DevLogin} style={styles.DevloginButton}>
              <Text style={styles.DevloginButtonText}>DevLogin</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            );
    }

export default LoginPage

const styles = StyleSheet.create({
  logo: {
  },

  logoContainer: {
    alignItems: 'center', // Center the content horizontally
    marginBottom: 40,
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

  loginButton: {
    width: '80%',
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  registerButtton: {
    color: 'black', // Example color for text
    fontSize: 12,
    marginBottom: 100
  },

  devLoginButton: {
    alignSelf: 'center', // Align the button to the center horizontally
    position: 'absolute',
    bottom: 100, // Adjust bottom spacing as needed
  },

  loginButtonText: {
    color: 'white', // Add color for text
    textAlign: 'center',
    fontWeight: 'bold', // Example font weight (adjust as needed)
    fontSize: 16,

  },

  forgotPasswordText: {
    color: 'black', // Example color for text
    fontSize: 10,
    marginBottom: 20,
  },

  registerButttonText: {
    color: 'black', // Example color for text
    fontSize: 10,
  },

  DevloginButtonText: {
    color: 'black', // Example color for text
    fontWeight: 'bold', // Example font weight (adjust as needed)
    fontSize: 16,
  }
})