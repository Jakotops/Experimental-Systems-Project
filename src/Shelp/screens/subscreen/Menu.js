// Sets the display screen for the menu
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { FirebaseAuth } from '../../Firebase'
import { signOut } from "firebase/auth";

const Menu = ({navigation}) => {

  const auth = FirebaseAuth;

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User has been logged out');
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