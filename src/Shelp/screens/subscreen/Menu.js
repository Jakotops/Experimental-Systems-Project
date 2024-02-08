// Sets the display screen for the menu
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'


const Menu = ({navigation}) => {
  return (
    <View>
      <Text>Menu</Text>
      // Adds the buttons to the menu to navagate to the other screens
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={() => navigation.navigate('NonAuthenticated')} />
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({})