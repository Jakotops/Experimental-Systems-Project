// TO DO: Display two custom list compenents side by side in a navigation stack

import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import RegularList from './RegularList'
import { useNavigation } from '@react-navigation/core';
import {Picker} from '@react-native-picker/picker';
 
const DoubleList = ({listName1, listName2, listItems1, listItems2, listFeatures1, listFeatures2, containerHeight}) => {
  const [showDiet, setShowDiet] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const navigation = useNavigation();

  const [isDietClicked, setIsDietClicked] = useState(false);
  const [isIngredientsClicked, setIsIngredientsClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
          <Text style={[styles.buttonText, isDietClicked && styles.clickedButtonText]}>{listName1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isIngredientsClicked && styles.clickedButton]}
          onPress={toggleIngredientsList}
        >
          <Text style={[styles.buttonText, isIngredientsClicked && styles.clickedButtonText]}>{listName2}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Picker
          style={styles.button}
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Drinks" value="drinks" />
          <Picker.Item label="Condiments" value="condiments" />
          <Picker.Item label="Biscuits" value="biscuits" />
          <Picker.Item label="Crisps" value="crisps" />
          <Picker.Item label="Meat" value="meat" />
          <Picker.Item label="Vegetables" value="vegetables" />
          <Picker.Item label="Other Snacks" value="othersnacks" />
          <Picker.Item label="Miscellaneous" value="miscellaneous" />
        </Picker>
      </View>
      <View>
        {showDiet && (
          <View>
            <RegularList name={listName1} items={listItems1} features={listFeatures1} listHeight={containerHeight}/>
          </View>
        )}
      </View>
      <View>
        {showIngredients && (
          <View >
            <RegularList name={listName2} items={listItems2} features={listFeatures2} listHeight={containerHeight}/>
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
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25, 
  },
  clickedButton: {
    backgroundColor: '#F69D34',
  },
  clickedButtonText: {
    color: 'white',
  },
});