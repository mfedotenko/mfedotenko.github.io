  
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
  messaging.requestPermission().then(function() {
     //getToken(messaging);
     return messaging.getToken();
  }).then(function(token){
  console.log(token);
  })
.catch(function(err) {
  console.log('Permission denied', err);
});


messaging.onMessage(function(payload){
console.log('onMessage: ',payload);
});
