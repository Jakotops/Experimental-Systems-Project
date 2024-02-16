// TO DO: Display two custom list compenents side by side in a navigation stack

import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import RegularList from './RegularList'

const DoubleList = () => {
  const [showDiet, setShowDiet] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleDietList = () => {
    setShowDiet(!showDiet);
    setShowIngredients(false);
  };

  const toggleIngredientsList = () => {
    setShowIngredients(!showIngredients);
    setShowDiet(false);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button title="Show Diet" onPress={toggleDietList} />
        <Button title="Show Ingredients" onPress={toggleIngredientsList} />
      </View>
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

const styles = StyleSheet.create({})