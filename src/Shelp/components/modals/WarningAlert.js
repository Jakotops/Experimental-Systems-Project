

import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React from 'react';
import { Modal } from "./Modal";

const WarningImage = require('../../assets/images/warning.png');

export default function WarningAlert({ isVisible, onClose, data, barcode, image }) {
  return (
    <Modal isVisible={isVisible}>
      <Modal.Container>
        <Modal.Header title="Warning" />
        <Modal.Body>
          <Image source={{uri: image}} style={styles.image} />
          <Text style={styles.text}>{data}</Text>
          <Text style={styles.text}>Barcode: {barcode}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button title={'Close'} onPress={onClose} />
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 160,
    height: 220,
    borderRadius: 18,
    resizeMode: 'center',
  }
});
