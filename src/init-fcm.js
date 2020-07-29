import * as firebase from "firebase/app";
import "firebase/messaging";


let firebaseConfig = {
    apiKey: "AIzaSyCOvmLGpbzVEgMywSh3g4g6mbaynTbdIiU",
    authDomain: "careamarillo.firebaseapp.com",
    databaseURL: "https://careamarillo.firebaseio.com",
    projectId: "careamarillo",
    storageBucket: "careamarillo.appspot.com",
    messagingSenderId: "461686716459",
    appId: "1:461686716459:web:cd49f75ab5acd74f65526e",
    measurementId: "G-2VEJDKXSHD"
};


let messaging = null
if (firebase.messaging.isSupported()) {
    const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

    messaging = initializedFirebaseApp.messaging();

    messaging.usePublicVapidKey(
        // Project Settings => Cloud Messaging => Web Push certificates
        "BAbQqzrfIWAgTvVnNJVrJvyEoUrh2uBtDYx2iT3cbW5JfKEHJFRn3Ruyjs4H9OsD1rjYDCQRR2UAO_46anL8Sgk"
    );
}

export { messaging };