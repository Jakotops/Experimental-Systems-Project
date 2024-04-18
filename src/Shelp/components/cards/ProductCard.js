// TO DO: Create a card for product information using the user database of scanned items

import { readDocmentsMatchingField, getCurrentUserId } from '../../Firebase/FirestoreFunctions';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

const ProductCard = ({route}) => {
  const { productBarcode }  = route.params;
  const userId = getCurrentUserId();
  const [productData, setProductData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const retriveProductData = async () => {
      try {
        const productsRetrived = await readDocmentsMatchingField('products', 'userId', userId);
        // console.log("Products: " + productsRetrived);
        let productData = {};
        for (let i = 0; i < productsRetrived.length; i++) {
          if (productsRetrived[i].barcode === productBarcode) {
            productData = productsRetrived[i];
            productData.productNutrition ? productData.productNutrition.toUpperCase() : ""
            setProductData(productData);
          }
        }
        // console.log(productData); 
        const ingredientObjectList = productData.productIngredients;
        const allergens = productData.productAllergens ? productData.productAllergens : "";
        const allergenList = allergens.split(',');
        //console.log(ingredientObjectList);
        let ingredientArray = [];
        for (let i = 0; i < ingredientObjectList.length; i++) {
          const ingredientObject = ingredientObjectList[i];
          const ingredientId = ingredientObject.id

          if (ingredientId.includes('en:')) {
            let ingredient = ingredientId.replace('en:', ''); 
            ingredient = ingredient.replace(/-/g, ' ');
            //capitalize the first letter of each word
            if (ingredient.trim().split(' ').length > 4) {
              continue;
            }
            ingredient = ingredient.replace(/\b\w/g, l => l.toUpperCase());
            ingredientArray.push({ name: ingredient });
          }
        }
        for (let i = 0; i < allergenList.length; i++) {
          if (allergenList[i] === "") {
            continue;
          }
          let allergen = allergenList[i];
          allergen = allergen.replace('en:', '');
          allergen = allergen.replace(/\b\w/g, l => l.toUpperCase());
          ingredientArray.push({ name: allergen + " (Allergen)" });
        }
        //console.log(ingredientArray);
        setIngredients(ingredientArray);
      } catch (error) {
        console.error('Error loading product data:', error);

    }
    setLoading(false);
  };
    retriveProductData();
    return () => {setLoading(true)};
  }, []); 
  if (loading) {
    return (
        <View >
          <Text></Text>
        </View>
    )
  }
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding:20}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{productData.productName}</Text>
      </View>
      <Image 
        style={productData.productImage ? styles.imageContainer : styles.placeholderImageContainer}
        source={productData.productImage ? {uri: productData.productImage} : require('../../assets/logo.png')}
        />
      {!productData.productSafety && 
      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Flagged Diets</Text>
      </View>}
      {!productData.productSafety && productData.flaggedDiets && productData.flaggedDiets.map((item, index) => {
          let formattedItem = item.replace(/\b\w/g, l => l.toUpperCase());
          // Replace underscores with whitespace
          formattedItem = formattedItem.replace(/_/g, ' ');
          return (
            <Text style={styles.text} key={index}>{formattedItem}</Text>
          );
        }
      )}
      {!productData.productSafety &&
      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Flagged Ingredients</Text>
      </View>}
      {!productData.productSafety && productData.flaggedIngredients && productData.flaggedIngredients.map((item, index) => (
        <Text style={[styles.text]} key={index}>{item.replace(/\b\w/g, l => l.toUpperCase())}</Text>
      ))}

      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Nutricore Grade</Text>
      </View>
        <Text style={[styles.text]}>{productData.productNutrition ? productData.productNutrition.toUpperCase() : "unknown"}</Text>
      <View style={styles.subtitleContainter}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>
      {ingredients.map((item, index) => (
        <Text style={[styles.text]} key={index}>{item.name}</Text>
      ))}
      </ScrollView>
    </SafeAreaView>



  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    backgroundColor: '#f19a33', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20, 
    borderWidth: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    textAlign: 'center', 
  },
  subtitleContainter: {
    backgroundColor: 'lightgray', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 20, 
    borderWidth: 1, 
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    alignItems: 'center', 
  },
  text: {
    fontSize: 20,
    
  },
  imageContainer: {
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode: "stretch",
    borderWidth: 1,
    borderColor: 'black',

  },
  placeholderImageContainer: {
    width: 200,
    height: 100,
    borderRadius: 10,
    resizeMode: "stretch",
    borderWidth: 1,
    borderColor: 'black',
  }
})