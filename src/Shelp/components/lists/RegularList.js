// TO DO: Create a reusable list component that conditionally renders the checkmarks or arrow buttons based on the props passed to it
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Used for storing data
import React, { useState, useEffect } from 'react'

const RegularList = ({type}) => {
  let items = [];

  const [checkedItems, setCheckedItems] = useState({}); // State to store checked items

  useEffect(() => { // React hook, it runs the function passed as the first argument (the effect function)
    // after every render if the dependencies listed in the second argument (the dependancy array) have changed

    // Load checked items from AsyncStorage when the component mounts based on the 'type' prop
    // It sets the 'checkedItem' state with the loaded data

    const loadCheckedItems = async () => { // An asynchronous function that loads checked items from AsyncStorage
      try {
        const storedCheckedItems = await AsyncStorage.getItem(`${type}_checked_items`); 
        // Retrieves the stored checked items from AsyncStorage, the key used is based on 'type' prop
        if (storedCheckedItems !== null) {
          // If there are stored checked items, it parses the JSON string into an object and sets the 
          // 'checkedItems' state using 'setCheckedItems'
          setCheckedItems(JSON.parse(storedCheckedItems));
        }
      } catch (error) {
        console.error('Error loading checked items:', error);
      }
    };

    loadCheckedItems(); // Function called when the prop changes
  }, [type]);

  // Check the type prop and populate the items array accordingly
  if (type === 'diet') {
    items = [
      { name: 'Hindu' },
      { name: 'Halal' },
      { name: 'Kosher' },
      { name: 'Vegan' },
      { name: 'Vegetarian' },
      { name: '...' },
      // Add more diet items here as needed
    ];
  } else if (type === 'ingredients') {
    // Populate the items array with ingredients
    items = [
      { name: 'Ingredient 1' },
      { name: 'Ingredient 2' },
      { name: '...' },
      // Add more ingredient items here as needed
    ];
  }

  // Function to toggle the checked state of an item
  const toggleCheckbox = async (index) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems }; // Creates a copy of the previous state of 'checkedItems' using the spread operator
      updatedCheckedItems[index] = !updatedCheckedItems[index]; // Toggle the checked state
      return updatedCheckedItems;
    });

    try {
      await AsyncStorage.setItem(`${type}_checked_items`, JSON.stringify({
        ...checkedItems,
        [index]: !checkedItems[index], 
      })); // Stores the updated 'checkedItems' state in AsyncStorage, it updates the item at the index with new checked state
    } catch (error) {
      console.error('Error saving checked items:', error);
    }
  };

  return ( // List is rendered using 'TouchableOpacity'
    <View>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => toggleCheckbox(index)}>
          <View style={[styles.checkbox, checkedItems[index] && styles.checked]} /> 
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RegularList

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  checked: {
    backgroundColor: '#77DD77', // Change the background color when checked
  },
});