// TO DO: Display two custom list compenents side by side in a navigation stack

import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RegularList from './RegularList'
import { useNavigation } from '@react-navigation/core';

const DoubleList = () => {
  const [showDiet, setShowDiet] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const navigation = useNavigation();

  const [isDietClicked, setIsDietClicked] = useState(false);
  const [isIngredientsClicked, setIsIngredientsClicked] = useState(false);

  const toggleDietList = () => {
    setShowDiet(!showDiet);
    setShowIngredients(false);
    setIsDietClicked(!isDietClicked);
    setIsIngredientsClicked(false);
  };

  const toggleIngredientsList = () => {
    setShowIngredients(!showIngredients);
    setShowDiet(false);
    setIsIngredientsClicked(!isIngredientsClicked);
    setIsDietClicked(false);
  };

  const toggleProductCard = () => {
    navigation.navigate('ProductCardTest');
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={[styles.button, isDietClicked && styles.clickedButton]}
          onPress={toggleDietList}
        >
          <Text style={[styles.buttonText, isDietClicked && styles.clickedButtonText]}>Diet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isIngredientsClicked && styles.clickedButton]}
          onPress={toggleIngredientsList}
        >
          <Text style={[styles.buttonText, isIngredientsClicked && styles.clickedButtonText]}>Ingredients</Text>
      </TouchableOpacity>
      </View>
      <View><Button title="Product Card [Test]" onPress={toggleProductCard} /></View>
      <View>
        {showDiet && (
          <View>
            <RegularList type = 'diet'/>
          </View>
        )}
        {showIngredients && (
          <View>
            <RegularList type = 'ingredients' />
            {/* Render your ingredients list here */}
          </View>
        )}
      </View>
    </View>
  );
};


export default DoubleList

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    width: 150,
    borderWidth: 1,
    borderColor: 'black',
    //padding: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25, 
  },
  clickedButton: {
    backgroundColor: '#4bcba3',
  },
  clickedButtonText: {
    color: 'white',
  },
});