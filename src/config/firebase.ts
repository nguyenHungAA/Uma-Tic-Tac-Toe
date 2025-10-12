// config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAvlSFDbu6rZY0iHNmDK99RZZ-7-f10cnQ",
    authDomain: "uma-tic-tac-toe.firebaseapp.com", // Make sure this is correct
    projectId: "uma-tic-tac-toe",
    storageBucket: "uma-tic-tac-toe.firebasestorage.app",
    messagingSenderId: "270202916235",
    appId: "1:270202916235:web:fe3c32cd7c5cbb0e98338e",
    measurementId: "G-BFK6X0X384"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);