importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_x4-dI06Kk4x3V6DRMM9V441d_02ULRo",
    authDomain: "push2-9ee71.firebaseapp.com",
    databaseURL: "https://push2-9ee71.firebaseio.com",
    projectId: "push2-9ee71",
    storageBucket: "push2-9ee71.appspot.com",
    messagingSenderId: "1036791400789"
  };

  firebase.initializeApp(config);
  const messaging = firebase.messaging();
