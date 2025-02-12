// TO DO: Create a reusable list component that conditionally renders the checkmarks or arrow buttons based on the props passed to it
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Used for storing data
import React, { useState, useEffect } from 'react'
import DietCard from '../cards/DietCard';
import { useNavigation } from '@react-navigation/core';
import { updateDocumentField, getCurrentUserId, readDocumentField } from '../../Firebase/FirestoreFunctions';

const RegularList = ({name, items,  features, listHeight}) => {
  const navigation = useNavigation();
  const [checkedItems, setCheckedItems] = useState({}); // State to store checked items
  const [isDietCardVisible, setIsDietCardVisible] = useState(false); // State to manage DietCard visibility
  const userId = getCurrentUserId();

  useEffect(() => { // React hook, it runs the function passed as the first argument (the effect function)
    // after every render if the dependencies listed in the second argument (the dependancy array) have changed

    // Load checked items from AsyncStorage when the component mounts based on the 'type' prop
    // It sets the 'checkedItem' state with the loaded data
      
    const loadCheckedItems = async () => { // An asynchronous function that loads checked items from AsyncStorage
      try {
        const storedCheckedItems = await AsyncStorage.getItem(`${name}_checked_items`); 
        // Retrieves the stored checked items from AsyncStorage, the key used is based on 'type' prop
        if (storedCheckedItems !== null) {
          // If there are stored checked items, it parses the JSON string into an object and sets the 
          // 'checkedItems' state using 'setCheckedItems'
          setCheckedItems(JSON.parse(storedCheckedItems));
          //
          //console.log('Loaded checked items:', storedCheckedItems);
        }
        else{
          const firebaseList = await readDocumentField('users', userId, name.toLowerCase());
          //console.log('Loaded checked items:', firebaseList);
          let checkedItems = {};
          for ( num in firebaseList) {
            checkedItems[firebaseList[num]] = true;
          }
          AsyncStorage.setItem(`${name}_checked_items`, JSON.stringify(checkedItems));
          setCheckedItems(checkedItems);
        }
      } catch (error) {
        console.error('Error loading checked items:', error);
      }
    };
    // Save checked items to Firestore when the component unmounts based on the 'type' prop
    const saveCheckedItems = async () => { 
      try {      
        let checkedIds = [];
        // Get the checked items from AsyncStorage
        const checkboxObject = JSON.parse(await AsyncStorage.getItem(`${name}_checked_items`));
        // Loop through the 'checkedItems' state and push the checked items to the 'checkedIds' array
        for (const [key, value] of Object.entries(checkboxObject)) {
          if (value === true) {
            checkedIds.push(key);
          }
        }
        // Save the checked items to Firestore using the 'updateDocumentField' function
        updateDocumentField('users', userId, name.toLowerCase(), checkedIds);
      } catch (error) {
        console.error('Error saving checked items:', error);
      }
    }
    if (features[0]) {
     loadCheckedItems();
    } // Function called when the prop changes
    return () => {
      if (features[0]){
      saveCheckedItems();
      } // Function called when the component unmounts ("derenders")
    }
  }, [name]);
  // Function to toggle the checked state of an item
  const toggleCheckbox = async (index) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems }; // Creates a copy of the previous state of 'checkedItems' using the spread operator
      updatedCheckedItems[index] = !updatedCheckedItems[index]; // Toggle the checked state
      return updatedCheckedItems;
    });

    try {
      await AsyncStorage.setItem(`${name}_checked_items`, JSON.stringify({
        ...checkedItems,
        [index]: !checkedItems[index], 
      })); // Stores the updated 'checkedItems' state in AsyncStorage, it updates the item at the index with new checked state
    } catch (error) {
      console.error('Error saving checked items:', error);
    }
  };

  const arrowPress = (cardName) => {
    if (name === 'Diets') {
      navigation.navigate('Diet Card', {dietName: cardName.name, banned_ingredients: cardName.banned_ingredients});
    }
    else if (name === 'Safe' || name === 'Unsafe') {
      navigation.navigate('ProductCardTest', {productBarcode: cardName.barcode});
    }
    
  };
  return ( // List is rendered using 'TouchableOpacity'
    <ScrollView style={{height:listHeight}}>
      <View style={{paddingBottom:10}}>
        {items.map((items, index) => (
          <TouchableOpacity key={index + 1} style={styles.itemContainer} onPress={() => {if(features[0]){toggleCheckbox(index + 1)}}}>
          {features[0] && <View style={[styles.checkbox, checkedItems[index + 1] && styles.checked]}/>} 
          <Text style={[styles.text]} key={index + 1}>{items.name.replace(/\b\w/g, l => l.toUpperCase())}</Text>
            {features[1] && <TouchableOpacity style={styles.arrowButton} onPress={() => arrowPress(items)}><Text style={styles.arrowIcon}>→</Text></TouchableOpacity>}
          </TouchableOpacity>
        ))}
        {/*{isDietCardVisible && <DietCard/>}*/}
      </View>
    </ScrollView>
  );
};

export default RegularList

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 250, 
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  arrowButton: {
    marginLeft: 'auto', // Pushes the arrow button to the right
    borderWidth: 1,
    borderColor: 'gray',
    width: 60, 
    borderRadius: 15,
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 23,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  checked: {
    backgroundColor: '#F69D34', // Change the background color when checked
  },
  text: {
    fontSize: 35,
    width: '65%',
  },
});