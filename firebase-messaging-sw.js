<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>

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

firebase.messaging();

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }
    
        return clients.openWindow(target);
    }));
});
