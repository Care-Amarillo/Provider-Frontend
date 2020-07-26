// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');



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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
// firebase.initializeApp({
//   'messagingSenderId': '219010709254'
// });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Vacancy';
    const notificationOptions = {
        body: 'New Shelter beds available!'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});


// self.addEventListener('push', function(event) {
//   console.log('[Service Worker] Push Received.');
//   // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//   const title = 'Push Codelab';
//   const options = {
//     body: 'Yay it works.'

//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });



// self.addEventListener('onMessage', function(event) {
//   console.log('[Service Worker] Push Received.');
//   // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

//   const title = 'Push Codelab';
//   const options = {
//     body: 'Yay it works.'

//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });
// [END background_handler]