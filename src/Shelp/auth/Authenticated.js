// Displays the nested stack for the user when they logged in to the app. The stack will contain the profile, camera, and preference pages.

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import { FirebaseAuth, FirebaseDb, updateDocumentField } from '../Firebase'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PreferencePage from './../screens/PreferencePage';
import ProfilePage from './../screens/ProfilePage';
import Camerapage from './../screens/CameraPage';


function AuthenticatedTabs(){
  const [newUser, setNewUser] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const auth = FirebaseAuth;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in');
        const uid = user.uid;
        CheckIfNewUser(uid);
      }
    });
    return unsubscribe;
  }, []); 

  const CheckIfNewUser = ( id ) => {
    const db = FirebaseDb;
    const docRef = doc(db, "users", id);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setNewUser(docSnap.data().newUser);

        } else {
          console.log("No such document!");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        setLoading(false);
      });
  }

  const Tab = createBottomTabNavigator();

  if (loading) {  
    return (
      <View><Text>Loading...</Text></View>
    );
  }
  return (
    <Tab.Navigator
    initialRouteName={newUser ? "Preference" : "Camera"}
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