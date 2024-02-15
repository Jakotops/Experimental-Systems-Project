// Sets the display screen for the menu
import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { FirebaseAuth, FirebaseDb, updateDocumentField } from '../../Firebase'
import { doc, setDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Menu = ({navigation}) => {
  const [id, setId] = React.useState('');
  const auth = FirebaseAuth;
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in');
        setId(user.uid);
      } else {
        console.log('User is not logged in');
      }
    })
    return unsubscribe;},[]);
    


  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User has been logged out');
      
      updateDocumentField('users', id, 'newUser', false);
      navigation.navigate('NonAuthenticated')
    }).catch((error) => {
      console.log(error.message)
    });
  }

  return (
    <View>
      <Text>Menu</Text>
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({})