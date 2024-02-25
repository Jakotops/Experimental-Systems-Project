import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseDb } from "./Firebase";

// Reads a document from the database
// @Params collection (String): the collection to store the document
// @Params docId (String): the document id
// @Returns (Object): the document data
export const readDocument = async (collection, docId) => {
    const docRef = doc(FirebaseDb, collection, docId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data(), "from document:", docId, "in collection:", collection);
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  }
  
  // Reads a field from a document in the database 
  // @Params collection (String): the collection to store the document
  // @Params docId (String): the document id
  // @Params field (String): the field to read
  // @Returns the value of the field
  export const readDocumentField = async (collection, docId, field) => {
    const docRef = doc(FirebaseDb, collection, docId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log(docSnap.data());
        //console.log(field, ":", docSnap.data()[field], "from document:", docId, "in collection:", collection);
        return docSnap.data()[field];
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  }
  
  // Update a field in a document of the database
  // @Params collection (String): the collection to store the document
  // @Params docId (String): the document id
  // @Params field (String): the field to update
  // @Params value: the value to update the field to
  export const updateDocumentField = (collection, docId, field, value) => {
    const docRef = doc(FirebaseDb, collection, docId);
    updateDoc(docRef, {
      [field]: value
    })  
    .then(() => {
      //console.log("Document successfully updated! ("+ collection + " " + docId + " " + field + " " + value + ")");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
  
  // Create a new document in a collection of the database
  // @Params collection (String): the collection to store the document
  // @Params docId (String): the document id
  // @Params data (Object): the data to store in the document
  export const createDocument = (collection, docId, data) => {  
    //console.log("Creating document with ID: ", docId, "in collection: ", collection, "with data: ", data);
    const userRef = doc(FirebaseDb, collection, docId);
    setDoc(userRef, data)
    // print added document to console
    .then(() => {
      //console.log("Document written with ID: ", docId, "to collection: ", collection);
      //console.log("Document data:", data);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  