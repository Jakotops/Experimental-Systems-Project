// Sets the display screen for the menu
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState
 } from 'react'
import { updateDocumentField, readDocumentField } from '../../Firebase/FirestoreFunctions'
import { FirebaseAuth } from '../../Firebase/Firebase'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({navigation}) => {

  const [id, setId] = useState('');
  const auth = FirebaseAuth;
  const [currentUsername, setCurrentUsername] = useState('');
  const [loading, setLoading] = useState(true);
  // Checks if the user is logged in on the menu screen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log('User is logged in');
        setId(user.uid);
      } else {
        //console.log('User is not logged in');
      }
    })

    const getCurrentUserId = () => {
      const user = FirebaseAuth.currentUser;
      if (user) {
        return user.uid;
      } else {
        console.log("No user is currently logged in.");
        return null;
      }
    }

    const currentUserId = getCurrentUserId();
    let username = '';
    if (currentUserId) {
      readDocumentField('users', currentUserId, 'username').then((result) => {
      username = result;
      setCurrentUsername(username);
      setLoading(false);
      });
    }
    return ()=> {
      unsubscribe();
      setLoading(true);
    };},[]);
    

  // Logs the user out
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User has been logged out');

      // Sets new user status to false (better implentation is to read status from the database to reduce writes
      updateDocumentField('users', id, 'newUser', false);
      AsyncStorage.removeItem('Diets_checked_items');
      AsyncStorage.removeItem('Ingredients_checked_items');
      navigation.reset({
        index: 0,
        routes: [{ name: "NonAuthenticated" }]
      });
    }).catch((error) => {
      console.log(error.message)
    });
  }

  if (loading) {
    return (
      <View>
        <Text></Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
    <Text style={styles.greetingText}>Hello {currentUsername}</Text>
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

export default Menu

const styles = StyleSheet.create({

  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // Adjust as needed for spacing from the top
  },

  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  greetingText:{
    color: 'orange',
    fontSize: 32, // Increase font size
    fontWeight: 'bold',
    //textTransform: 'uppercase', // Example text transformation
  },
});
