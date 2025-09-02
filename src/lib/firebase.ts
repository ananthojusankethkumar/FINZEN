// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "finzen-be9cy",
  appId: "1:772100010405:web:8ac284e6cf3d40eafc384c",
  storageBucket: "finzen-be9cy.firebasestorage.app",
  apiKey: "AIzaSyBuxqO0QgAJM7qEuBFb94jS0zflxYhY8dk",
  authDomain: "finzen-be9cy.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "772100010405",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
