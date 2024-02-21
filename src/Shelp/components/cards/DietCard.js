// TO DO: Create a card for diet information displaying a list of multiple ingredients using a list component
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const DietCard = ({route}) => {
  const { dietName } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>DietCard: { dietName }</Text>
    </SafeAreaView>
  )
}

export default DietCard

const styles = StyleSheet.create({})