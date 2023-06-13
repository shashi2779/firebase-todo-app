// "initializeApp" nam se method milta hai "firebase" me
// "firebaseConfig" k ander jitane bhi credentials hai , ye credentials hamare firebase ko initialise karne k liye jaruri hai
import { initializeApp } from "firebase/app";

// authentication k liye firebase me "getAuth" method milta hai
// "getAuth" method authentication service enable karta hai firebase me 
import {getAuth} from 'firebase/auth'
// databse handle karne k liye firebase me "getFirestore" method milta hai
import {getFirestore} from 'firebase/firestore'


// credentials
const firebaseConfig = {
  apiKey: "AIzaSyDZSZDoQ2zCjLFfGwqEsBxnHLvMSC6fa6A",
  authDomain: "fir-todo-app-2d1af.firebaseapp.com",
  projectId: "fir-todo-app-2d1af",
  storageBucket: "fir-todo-app-2d1af.appspot.com",
  messagingSenderId: "624042332883",
  appId: "1:624042332883:web:49ec496b516d0b212dba26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yha do chije create karegen 1- authentication , 2- db => database
// app pass krr diye
// Initialize Firebase Authentication, database and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)