// TO DO: Create a reusable list component that conditionally renders the checkmarks or arrow buttons based on the props passed to it
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const RegularList = ({type}) => {
  let items = [];

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

  return (
    <View>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => console.log(item.name)}>
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
});