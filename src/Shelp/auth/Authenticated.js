import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'; //import the navigation container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreferencePage from './../screens/PreferencePage';
import ProfilePage from './../screens/ProfilePage';
import Camerapage from './../screens/CameraPage';

function AuthenticatedTabs(){
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    initialRouteName='Camera'
    screenOptions={{headerShown:false}}
    >
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Camera" component={Camerapage} />
      <Tab.Screen name="Preference" component={PreferencePage} />
    </Tab.Navigator>
  );
}

const Authenticated = () => {
    return (
      <AuthenticatedTabs />
    );
}

export default Authenticated