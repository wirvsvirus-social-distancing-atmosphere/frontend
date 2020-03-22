import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyADVe9U4RAhgRQfbsPieA0O8wCRROqE2g4",
    authDomain: "social-atmosphere.firebaseapp.com",
    databaseURL: "https://social-atmosphere.firebaseio.com",
    projectId: "social-atmosphere",
    storageBucket: "social-atmosphere.appspot.com",
    messagingSenderId: "734899272393",
    appId: "1:734899272393:web:c468e49da7dac39b8aeb18",
    measurementId: "G-4LX7246PN2"
};

if (!firebase.apps.length) {
    // init first
    firebase.initializeApp(config);
}

export default firebase;