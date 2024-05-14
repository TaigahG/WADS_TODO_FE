// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnTYpqUChbSuvW0oz-HyHScQFSMj4peOk",
  authDomain: "todo-gita.firebaseapp.com",
  projectId: "todo-gita",
  storageBucket: "todo-gita.appspot.com",
  messagingSenderId: "801571397534",
  appId: "1:801571397534:web:8318306566767ce383008f",
  measurementId: "G-CDVPR0MMT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
