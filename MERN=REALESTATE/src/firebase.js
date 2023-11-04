// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNWl41Dhd6N0Mdt0O5Zibd0Lng_-k46vw",
    authDomain: "mern-estate-b7dc8.firebaseapp.com",
    projectId: "mern-estate-b7dc8",
    storageBucket: "mern-estate-b7dc8.appspot.com",
    messagingSenderId: "180705653488",
    appId: "1:180705653488:web:7dcc7ce6a8e2157b910835",
    measurementId: "G-5F2V4KPVVV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);