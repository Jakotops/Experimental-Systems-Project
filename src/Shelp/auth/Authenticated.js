// Displays the nested stack for the user when they logged in to the app. The stack will contain the profile, camera, and preference pages.

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { FirebaseAuth } from '../Firebase/Firebase'
import { readDocumentField } from '../Firebase/FirestoreFunctions'
import { onAuthStateChanged } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GettingStartedModal from "../screens/modals/GettingStartedModal";
import PreferencePage from './../screens/PreferencePage';
import ProfilePage from './../screens/ProfilePage';
import Camerapage from './../screens/CameraPage';


function Authenticated({ route }) {
  const forceOnboarding = route.params?.forceOnboarding ?? false;

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

  const Stack = createNativeStackNavigator();

  if (loading) {  
    return (
      <View><Text>Loading...</Text></View>
    );
  }

  // Screen is initialized to the "Getting Started" modal if the user is new, otherwise the camera page

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={newUser || forceOnboarding ? "GettingStartedModal" : "Main"}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="GettingStartedModal" component={GettingStartedModal} />
    </Stack.Navigator>
  );
}

function Main() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Camera"
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true
      }}
    >
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Camera" component={Camerapage} />
      <Tab.Screen name="Preference" component={PreferencePage} />
    </Tab.Navigator>
  );
}

export default Authenticated