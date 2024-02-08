// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Do not change this configuration otherwise the backend will break 
const firebaseConfig = {
  apiKey: "AIzaSyCP775EGqsdri21YrsUInYk8txajtr7AeU",
  authDomain: "shelp-bf12d.firebaseapp.com",
  projectId: "shelp-bf12d",
  storageBucket: "shelp-bf12d.appspot.com",
  messagingSenderId: "147510900530",
  appId: "1:147510900530:web:7a1c29032d8a34fe27492b",
  measurementId: "G-79N1C3Z928"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}


const auth = firebase.auth(); // Store the authentication object in a variable for login and signup
const db = firebase.firestore(); // Store the firestore object in a variable for database access
const analytics =  (app);

export { auth, db }; // Export the authentication and database objects for use in js files