// Sets the display screen for the menu
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState
 } from 'react'
import { updateDocumentField, readDocumentField } from '../../Firebase/FirestoreFunctions'
import { FirebaseAuth } from '../../Firebase/Firebase'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = ({navigation}) => {

  const [id, setId] = useState('');
  const auth = FirebaseAuth;
  const [currentUsername, setCurrentUsername] = useState(''); // [1
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
      });
    }
    return unsubscribe;},[]);
    

  // Logs the user out
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User has been logged out');

      // Sets new user status to false (better implentation is to read status from the database to reduce writes
      updateDocumentField('users', id, 'newUser', false);

      navigation.reset({
        index: 0,
        routes: [{ name: "NonAuthenticated" }]
      });
    }).catch((error) => {
      console.log(error.message)
    });
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
    <SafeAreaView> 
      <Text>Menu</Text>
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={handleLogout}/>
    </SafeAreaView>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})