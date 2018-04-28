// firebase_subscribe.js
firebase.initializeApp({
    messagingSenderId: '1036791400789'
});

// ������� ������������ �����������
// ������, ��� �������� ������ ������ ���������� Firebase, �� ��� ����� �� ������
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // ������������ ��� �������� ��������� �����������
    // ����������� �� ����������� ���� ��� �� ���������
    if (Notification.permission === 'granted') {
        subscribe();
    }

    // �� �����, ����������� � ������������ ���������� �� �����������
    // � ����������� ���
    $('#subscribe').on('click', function () {
        subscribe();
    });
}

function subscribe() {
    // ����������� ���������� �� ��������� �����������
    messaging.requestPermission()
        .then(function () {
            // �������� ID ����������
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);

                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('�� ������� �������� �����.');
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('��� ��������� ������ ��������� ������.', err);
                    setTokenSentToServer(false);
                });
    })
    .catch(function (err) {
        console.warn('�� ������� �������� ���������� �� ����� �����������.', err);
    });
}

// �������� ID �� ������
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('�������� ������ �� ������...');

        var url = ''; // ����� ������� �� ������� ������� ��������� ID ����������
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('����� ��� ��������� �� ������.');
    }
}

// ���������� localStorage ��� ������� ����,
// ��� ������������ ��� ���������� �� �����������
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}