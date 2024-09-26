// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwSaA2OLPg13N7A5iqUbbSUKNl-TIIjmo",
    authDomain: "ezez-28aeb.firebaseapp.com",
    projectId: "ezez-28aeb",
    storageBucket: "ezez-28aeb.appspot.com",
    messagingSenderId: "179053777002",
    appId: "1:179053777002:web:b97ace31bab99fc87b7a13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
