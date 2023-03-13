// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1DHJzPjT1_TXyt1PLCL5KlKfnA61PShc",
    authDomain: "my-note-app-f339a.firebaseapp.com",
    projectId: "my-note-app-f339a",
    storageBucket: "my-note-app-f339a.appspot.com",
    messagingSenderId: "136363454669",
    appId: "1:136363454669:web:3ab45c5b33d543cdd13984",
    measurementId: "G-QB3SS5GLX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
