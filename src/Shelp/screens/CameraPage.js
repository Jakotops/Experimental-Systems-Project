// TO DO: Set up the scanner overlay and the alerts for the scanner as well as the logic from the results to the database
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";
import WarningAlert from '../components/modals/WarningAlert';
import SafeAlert from '../components/modals/SafeAlert';
import { idToObject } from "../Helpers/Id_To_Object_Mapper";
import { getProductData, evaluateProductGivenDietData } from "../Helpers/API_Handling_Module";
import { getCurrentUserId, readDocmentsMatchingField, createDocument, createDocumentWithAutoId } from '../Firebase/FirestoreFunctions';

const CameraPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSafeModalVisible, setIsSafeModalVisible] = useState(false);
  const [dietData, setDietData] = useState({userDiets: [], other_banned_ings: []});
  const [currentUserId, setCurrentUserId] = useState("");

  // close warning popup modal
  const onWarningModalClose = () => {
    setIsWarningModalVisible(false);
  }

  // close safe popup modal
  const onSafeModalClose = () => {
    setIsSafeModalVisible(false);
  }

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request for camera permission and get the current user id
  useEffect(() => {
    askForCameraPermission();


    // Get the current user's dietary preferences
    const retriveUserPreferences = async () => {
      try {
        const fetchedId = getCurrentUserId();
        const results = await idToObject(fetchedId);
        const resultsObject = {
          user_diets: results[0],
          other_bd_igrdnts: results[1]
        }
        setDietData(resultsObject);
      } catch (error) {
        //console.log("Error in getting user diets and ingredients: " + error);
      }
    } 
    retriveUserPreferences();
  }, []);

  // What happens when we scan the barcode
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    //console.log('Type: ' + type + '\nData: ' + data)
    // Check if the product is safe for the user
    const barcodeResults = await evaluateProductGivenDietData(data, dietData);
    //console.log("Barcode results: "+ JSON.stringify(barcodeResults));
    let modalText = "";
    // Checks if there is an error in fetching the product data
    if (!barcodeResults.success){
      modalText = "Error in fetching product data";
      setText(modalText);
      setIsWarningModalVisible(true);
      return;
    }
    // If the product has no ingredients, display a warning
    if (barcodeResults.no_ingrdts_fnd){
      modalText = barcodeResults.product_name + "\nWarning: No ingredients found for this product";
      setText(modalText);
      setIsWarningModalVisible(true);
    }
    // If the product is not safe, display the conflicting diets and ingredients
    else if (!barcodeResults.product_safety){
      modalText = barcodeResults.product_name + "\nThis product is not safe!" + "\nConflicting diets: " + barcodeResults.diets_cntrdctd + "\nConflicting ingredients: " + barcodeResults.bad_ingrdts_fnd;
      setText(modalText);
      setIsWarningModalVisible(true);
    }
    // If the product is safe, display a success message
    else {
      modalText = barcodeResults.product_name + "\nThis product is safe!"
      setText(modalText);
      setIsSafeModalVisible(true);
    }

    // Check if the product has been scanned before
    const currentUserId = getCurrentUserId();
    const userFirestoreProductDocuments = await readDocmentsMatchingField("products", "userId", currentUserId);
    //console.log("User history: " + JSON.stringify(userFirestoreProductDocuments));
    for (let i = 0; i < userFirestoreProductDocuments.length; i++){
      if (userFirestoreProductDocuments[i].barcode === data){
        console.log("Product already scanned");
        return;
      }
    }
    console.log("Product not scanned before");

    // Add the product to the user's history - To Do: Ingredients need to be preprocessed
    const scannedProductInfo = await getProductData(data, {ingrd_wanted: true, images_wanted: true, nutri_val_wanted: true, allergens_wanted: true}); 
    //console.log("Scanned product info: " + JSON.stringify(scannedProductInfo));
    const firestoreProductData = { 
      userId : currentUserId,
      barcode : data,
      productName : barcodeResults.product_name,
      productSafety : barcodeResults.product_safety,
      productIngredients : scannedProductInfo.ingredient_data ,
      productNutrition : scannedProductInfo.nutriscore_grade,
      productAllergens : scannedProductInfo.allergens,
      productImage: scannedProductInfo.image_data,
      flaggedIngredients : barcodeResults.bad_ingrdts_fnd,
      flaggedDiets : barcodeResults.diets_cntrdctd
    }
    //console.log("Firestore product data: " + JSON.stringify(firestoreProductData));
    createDocumentWithAutoId("products", firestoreProductData);

  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return(
    <View style={styles.container}>
      <Text></Text>
    </View>) 
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{margin: 10}}>Camera permission not granted</Text>
        <Button style={styles.button} title={'Allow Camera'} onPress={() => askForCameraPermission()}/>
      </View>
    );
  }
  
  // Return the main view
  return (
    <View style={styles.container}>

      {renderCamera()}

      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>Scan a barcode!</Text>
      </View>

{/*       <View style={styles.buttonContainer}>
        {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} style={styles.button} color='black'/>}
      </View> */}

      {scanned && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text style={styles.paragraph}>Scan again?</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <WarningAlert isVisible={isWarningModalVisible} onClose={onWarningModalClose} data={text}/>
      <SafeAlert isVisible={isSafeModalVisible} onClose={onSafeModalClose} data={text}/>
    </View>
  );
}

export default CameraPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraphContainer: {
    backgroundColor: '#f19a33', 
    padding: 40,
    borderRadius: 5,
    marginTop: 20, 
    width: '100%',
    position: 'absolute',
    bottom: 1, 
  },
  paragraph: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    textAlign: 'center',
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 125,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  }, 
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#f19a33', 
    padding: 40,
    borderRadius: 5,
    marginTop: 20, 
    width: '100%',
    position: 'absolute',
    bottom: 1,
    borderWidth: 1, 
  },
});