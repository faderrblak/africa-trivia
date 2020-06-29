// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKtYWVgsOTv9qJ28NCfUxfpx-o0qNEUsU",
    authDomain: "africa-trivia.firebaseapp.com",
    databaseURL: "https://africa-trivia.firebaseio.com",
    projectId: "africa-trivia",
    storageBucket: "africa-trivia.appspot.com",
    messagingSenderId: "606232726941",
    appId: "1:606232726941:web:a11f7df7f061acce6bf374",
    measurementId: "G-7M8KFS8JHQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();