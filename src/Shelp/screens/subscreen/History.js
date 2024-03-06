// TO DO: Create a history page for the app using firestore and a list custom component to show the scanned items
import DoubleList from '../../components/lists/DoubleList'
import { getCurrentUserId, readDocmentsMatchingField } from '../../Firebase/FirestoreFunctions'
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const History = () => {
  const [safeItems, setSafeItems] = useState([]);
  const [unsafeItems, setUnsafeItems] = useState([]);
  useEffect(() => {
    const LoadListData = async () => {
      try{
        const userId = getCurrentUserId();
        console.log("User id:" + userId);
        const historyItems = await readDocmentsMatchingField('products', 'userId', userId);
        console.log("Fetched Items: " + historyItems);
        let safeItemsList = [];
        let unsafeItemsList = [];
        historyItems.forEach(item => {
        if (item.productSafety) {
          safeItemsList.push({ name: item.productName });
        } else {
          console.log("Unsafe item: " + JSON.stringify(item));
          unsafeItemsList.push({ name: item.productName });
        }
        setSafeItems(safeItemsList);
        setUnsafeItems(unsafeItemsList);
      });
      } catch (error) {
        console.error('Error loading history items:', error);
      }
    }
    LoadListData();
  }, []);

  const safeFeatures = [false, true];
  const unsafeFeatures = [false, true];
  return (
      <DoubleList 
        listName1="Safe" 
        listName2="Unsafe" 
        listItems1={safeItems} 
        listItems2={unsafeItems} 
        listFeatures1={safeFeatures} 
        listFeatures2={unsafeFeatures} 
        containerHeight={525}
      />
  )};


export default History

const styles = StyleSheet.create({})