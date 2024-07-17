// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
// import firestore from "@react-native-firebase/firestore";
// import { getAuth } from "firebase/auth"; // Ensure this is the correct import
// import messaging from "@react-native-firebase/messaging";
// import auth from "@react-native-firebase/auth";
// import firebase from "@react-native-firebase/app";

import { initializeApp, firebase } from "firebase/app";

import "firebase/functions";
import "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAyJ1hL_35EObYmEnnx7IWYhRev69Gr9Dw",
//   authDomain: "taskmanagementapp-b68e8.firebaseapp.com",
//   projectId: "taskmanagementapp-b68e8",
//   storageBucket: "taskmanagementapp-b68e8.appspot.com",
//   messagingSenderId: "887418195217",
//   appId: "1:887418195217:web:3916c4d8fda6f781ebd0b0",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCTJv8pCtTBnSjTHT0n5QLKUNduYaA8nE4",
  authDomain: "tmapp-8a780.firebaseapp.com",
  projectId: "tmapp-8a780",
  storageBucket: "tmapp-8a780.appspot.com",
  messagingSenderId: "888783054314",
  appId: "1:888783054314:web:80f7690571121ac81dfe93",
};

const app = initializeApp(firebaseConfig, AsyncStorage);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { firebase, app, auth, db };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// }

// export const auth = getAuth(app); // Ensure auth is correctly initialized
// export { firebase, auth, firestore, messaging };
