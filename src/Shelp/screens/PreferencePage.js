// TO DO: Load the selected user preferences from the database and show the diet and the ingredients selection using a custom list component

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DoubleList from '../components/lists/DoubleList'

const PreferencePage = () => {
  return (
    <View>
      <DoubleList/>
    </View>
  )
}

export default PreferencePage

const styles = StyleSheet.create({})
