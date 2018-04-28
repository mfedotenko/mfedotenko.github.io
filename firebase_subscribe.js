// firebase_subscribe.js
firebase.initializeApp({
    messagingSenderId: '1036791400789'
});

// браузер поддерживает уведомлени€
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомлени€ если ещЄ не подписали
    if (Notification.permission === 'granted') {
        subscribe();
    }

    // по клику, запрашиваем у пользовател€ разрешение на уведомлени€
    // и подписываем его
    $('#subscribe').on('click', function () {
        subscribe();
    });
}

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);

                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('Ќе удалось получить токен.');
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('ѕри получении токена произошла ошибка.', err);
                    setTokenSentToServer(false);
                });
    })
    .catch(function (err) {
        console.warn('Ќе удалось получить разрешение на показ уведомлений.', err);
    });
}

// отправка ID на сервер
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('ќтправка токена на сервер...');

        var url = ''; // адрес скрипта на сервере который сохран€ет ID устройства
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('“окен уже отправлен на сервер.');
    }
}

// используем localStorage дл€ отметки того,
// что пользователь уже подписалс€ на уведомлени€
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}