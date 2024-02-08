import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'


const Menu = ({navigation}) => {
  const handleLogout = () => {
    // Reset the navigation stack to the NonAuthenticated screen
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'NonAuthenticated' }],
      })
    );
  };

  return (
    <View>
      <Text>Menu</Text>
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={() => navigation.navigate('NonAuthenticated')} />
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({})