// Sets the display screen for the menu
import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState
 } from 'react'
import { updateDocumentField } from '../../Firebase/FirestoreFunctions'
import { FirebaseAuth } from '../../Firebase/Firebase'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = ({navigation}) => {

  const [id, setId] = useState('');
  const auth = FirebaseAuth;
  
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
    <SafeAreaView> 
      <Text>Menu</Text>
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={handleLogout} />
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