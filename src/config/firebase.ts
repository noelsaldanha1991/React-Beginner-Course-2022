// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlznZKmLUXQ536ADPkdvdOXZiYHUdG5kE",
  authDomain: "react-course-50633.firebaseapp.com",
  projectId: "react-course-50633",
  storageBucket: "react-course-50633.firebasestorage.app",
  messagingSenderId: "735090847586",
  appId: "1:735090847586:web:5c3713c2e1d53218a5463b"
};

// Initialize Firebase
//app is the Firebase app instance, usually created with initializeApp(firebaseConfig).
const app = initializeApp(firebaseConfig); 

//The line const auth = getAuth(app); is typically used in Firebase Authentication in a JavaScript application. 
// It is used to initialize the Firebase Authentication service for a specific Firebase app instance.
//getAuth() is a function from the Firebase Authentication SDK that retrieves the authentication instance.
export const auth =getAuth(app);

//The line const provider = new GoogleAuthProvider(); is used in Firebase Authentication to create a Google authentication provider, 
// which allows users to sign in to your app using their Google account.
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);