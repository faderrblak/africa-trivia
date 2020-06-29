import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDKtYWVgsOTv9qJ28NCfUxfpx-o0qNEUsU",
    authDomain: "africa-trivia.firebaseapp.com",
    databaseURL: "https://africa-trivia.firebaseio.com",
    projectId: "africa-trivia",
    storageBucket: "africa-trivia.appspot.com",
    messagingSenderId: "606232726941",
    appId: "1:606232726941:web:a11f7df7f061acce6bf374",
    measurementId: "G-7M8KFS8JHQ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();

export default {
    firebase, db
}