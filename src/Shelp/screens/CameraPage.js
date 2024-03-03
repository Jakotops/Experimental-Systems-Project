// TO DO: Set up the scanner overlay and the alerts for the scanner as well as the logic from the results to the database
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import WarningAlert from '../components/modals/WarningAlert';
import SafeAlert from '../components/modals/SafeAlert';
import { idToObject } from "../Helpers/Id_To_Object_Mapper";
import { getProductData, evaluateProductGivenDietData } from "../Helpers/API_Handling_Module";
import { getCurrentUserId } from '../Firebase/FirestoreFunctions';

const CameraPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSafeModalVisible, setIsSafeModalVisible] = useState(false);
  const [dietData, setDietData] = useState({userDiets: [], other_banned_ings: []});

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
      const { status } = await BarCodeScanner.requestPermissionsAsync();
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
        console.log("Current user id: " + fetchedId);
        const results = await idToObject(fetchedId);
        const resultsObject = {
          user_diets: results[0],
          other_bd_igrdnts: results[1]
        }
        setDietData(resultsObject);
      } catch (error) {
        console.log("Error in getting user diets and ingredients: " + error);
      }
    } 
    retriveUserPreferences();
  }, []);

  // What happens when we scan the barcode
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
    // dummy code below to check if modals are popping up correctly.
    // All it does is show a warning when a QR code is scanned, and show a 'Safe' modal when anything else is scanned
    const barcodeResults = await evaluateProductGivenDietData(data, dietData);
    console.log("Barcode results: "+ JSON.stringify(barcodeResults));
    let modalText = "";
    if (!barcodeResults.success){
      modalText = "Error in fetching product data";
      setText(modalText);
      setIsWarningModalVisible(true);
      return;
    }
    if (barcodeResults.product_safety){
      modalText = barcodeResults.product_name + "\nThis product is safe for you!";
      setText(modalText);
      setIsSafeModalVisible(true);
      return;
    }
    else {
      modalText = barcodeResults.product_name + "\nThis product is not safe for you!" + "\nConflicting diets: " + barcodeResults.diets_cntrdctd + "\nConflicting ingredients: " + barcodeResults.bad_ingrdts_fnd;
      setText(modalText);
      setIsWarningModalVisible(true);
      return;
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return(
    <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
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
      <Text style={styles.paragraph}>Scan a barcode!</Text>

      {renderCamera()}

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} style={styles.button}/>}

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
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
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
});