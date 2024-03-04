import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { FirebaseDb, FirebaseAuth } from "./Firebase";

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
      //console.log(docSnap.data());
      //console.log(field, ":", docSnap.data()[field], "from document:", docId, "in collection:", collection);
      return docSnap.data()[field];
    } catch (error) {
      console.log("Error getting document:", error);
    }
  }

  // Reads all documents from a collection in the database if they match a field
  // @Params chosenCollection (String): the collection to store the document
  // @Params field (String): the field to match
  // @Params value: the value to match the field to
  // @Returns (Array): an array of documents that match the field
  
  export const readDocmentsMatchingField = async (chosenCollection, field, value) => {
    console.log("Reading documents from collection: ", chosenCollection, "where field: ", field, "is equal to: ", value);
    console.log("field: ", field, "value: ", value);
    const q = query(collection(FirebaseDb, chosenCollection), where(field, '==', value));
    try{
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        results.push(doc.data());
      });
      return results;
    }
    catch (error) {
      console.log("Error getting documents:", error);
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

  // Create a new document in a collection of the database with an auto-generated id
  // @Params collection (String): the collection to store the document
  // @Params data (Object): the data to store in the document
  export const createDocumentWithAutoId = (selectedCollection, data) => {
    const docRef = collection(FirebaseDb, selectedCollection);
    addDoc(docRef, data)
    .then((docRef) => {
      //console.log("Document written with ID: ", docRef.id, "to collection: ", collection);
      //console.log("Document data:", data);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }


  // Get the current user id
  export const getCurrentUserId = () => {
    const user = FirebaseAuth.currentUser;
    if (user) {
      console.log("Current user id: " + user.uid);
      return user.uid;
    } else {
      console.log("No user is currently logged in.");
      return null;
    }
  }
