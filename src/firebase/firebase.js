// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8F2icrO-WD3RfA6K0mwVF2wV3nbHtiKY",
    authDomain: "rental-8b771.firebaseapp.com",
    projectId: "rental-8b771",
    storageBucket: "rental-8b771.appspot.com",
    messagingSenderId: "1092627569015",
    appId: "1:1092627569015:web:3d065648d8e11567532972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, 'gs://rental-8b771.appspot.com')