// Displays the nested stack for the user when they logged in to the app. The stack will contain the profile, camera, and preference pages.

import { View, Text, Image } from 'react-native'
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

import cameraIcon from '../assets/camera-icon.png';
import profileIcon from '../assets/profile-icon.png';
import preferenceIcon from '../assets/preference-icon.png';
import preferenceIconFocused from '../assets/preference-icon-focused.png';
import profileIconFocused from '../assets/profile-icon-focused.png';
import cameraIconFocused from '../assets/camera-icon-focused.png';


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
      <Tab.Screen 
        name="Profile" 
        component={ProfilePage} 
        options={
          { tabBarIcon: ({ focused, color, size }) => (
            <Image source={focused ? profileIconFocused : profileIcon} style={{ width: size, height: size }} />
          ),
          tabBarActiveTintColor: '#FFA500'}
      }/>
      <Tab.Screen 
        name="Camera" 
        component={Camerapage}
        options={
          { tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image source={focused ? cameraIconFocused : cameraIcon} style={{ width: size, height: size }} />
            );
          },
          tabBarActiveTintColor: '#FFA500'}
      }/>
      <Tab.Screen 
        name="Preference" 
        component={PreferencePage}
        options={
          { tabBarIcon: ({ focused, color, size }) => (
            <Image source={focused ? preferenceIconFocused : preferenceIcon} style={{ width: size, height: size }} />
          ),
          tabBarActiveTintColor: '#FFA500'}
        }
         />
    </Tab.Navigator>
  );
}

export default Authenticated


