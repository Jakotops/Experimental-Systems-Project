// TO DO: Set up the scanner overlay and the alerts for the scanner as well as the logic from the results to the database
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import WarningAlert from '../components/modals/WarningAlert';
import SafeAlert from '../components/modals/SafeAlert';

const CameraPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSafeModalVisible, setIsSafeModalVisible] = useState(false);


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

  // Request for camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
    // dummy code below to check if modals are popping up correctly.
    // All it does is show a warning when a QR code is scanned, and show a 'Safe' modal when anything else is scanned
    if (type == 256) {
      setIsWarningModalVisible(true);
    }
    else {
      setIsSafeModalVisible(true);
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