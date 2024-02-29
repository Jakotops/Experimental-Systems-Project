// Displays the nested stack for the user when they logged in to the app. The stack will contain the profile, camera, and preference pages.

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { FirebaseAuth } from '../Firebase/Firebase'
import { readDocumentField } from '../Firebase/FirestoreFunctions'
import { onAuthStateChanged } from "firebase/auth";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PreferencePage from './../screens/PreferencePage';
import ProfilePage from './../screens/ProfilePage';
import Camerapage from './../screens/CameraPage';


function AuthenticatedTabs(){
  const [newUser, setNewUser] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Detects if the user has logged in
  useEffect(() => {
    const auth = FirebaseAuth;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log('User is logged in');
        const uid = user.uid;
        CheckIfNewUser(uid);
      }
    });
    return unsubscribe;
  }, []); 

  // Checks if the user is new
  const CheckIfNewUser = (id) => {
    readDocumentField('users', id, 'newUser')
    .then((newUser) => {
      setNewUser(newUser);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const Tab = createBottomTabNavigator();

  if (loading) {  
    return (
      <View><Text>Loading...</Text></View>
    );
  }
  return (
    // Tab navigator screen is intialized to the preference page if the user is new, otherwise the camera page
    <Tab.Navigator
    initialRouteName={newUser ? "Preference" : "Camera"}
    screenOptions={{
      headerShown:false,
      unmountOnBlur:true
    }}
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