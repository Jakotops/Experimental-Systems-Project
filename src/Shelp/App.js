//TODO: Set up the stack navigation of the screens
import { StyleSheet, Text, View } from 'react-native';
import Authenticated from './auth/Authenticated';
import NonAuthenticated from './auth/NonAuthenticated';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

export default function App() { 
  
  // Adds the nonauthenticated and authenticated state screens to the app stack
  // Each screen's nested stacks are found in the auth folder

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="NonAuthenticated" component={NonAuthenticated} />  
        <Stack.Screen options={{headerShown: false}} name="Authenticated" component={Authenticated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
