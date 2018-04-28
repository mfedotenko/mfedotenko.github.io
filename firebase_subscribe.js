// firebase_subscribe.js
firebase.initializeApp({
    messagingSenderId: '<SENDER_ID>'
});

// ��㧥� �����ন���� 㢥��������
// �����, ��� �஢��� ������ ������ ������⥪� Firebase, �� ��� �⮣� �� ������
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // ���짮��⥫� 㦥 ࠧ�訫 ����祭�� 㢥��������
    // ������뢠�� �� 㢥�������� �᫨ ��� �� �����ᠫ�
    if (Notification.permission === 'granted') {
        subscribe();
    }

    // �� �����, ����訢��� � ���짮��⥫� ࠧ�襭�� �� 㢥��������
    // � ������뢠�� ���
    $('#subscribe').on('click', function () {
        subscribe();
    });
}

function subscribe() {
    // ����訢��� ࠧ�襭�� �� ����祭�� 㢥��������
    messaging.requestPermission()
        .then(function () {
            // ����砥� ID ���ன�⢠
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);

                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('�� 㤠���� ������� ⮪��.');
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('�� ����祭�� ⮪��� �ந��諠 �訡��.', err);
                    setTokenSentToServer(false);
                });
    })
    .catch(function (err) {
        console.warn('�� 㤠���� ������� ࠧ�襭�� �� ����� 㢥��������.', err);
    });
}

// ��ࠢ�� ID �� �ࢥ�
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('��ࠢ�� ⮪��� �� �ࢥ�...');

        var url = ''; // ���� �ਯ� �� �ࢥ� ����� ��࠭�� ID ���ன�⢠
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('����� 㦥 ��ࠢ��� �� �ࢥ�.');
    }
}

// �ᯮ��㥬 localStorage ��� �⬥⪨ ⮣�,
// �� ���짮��⥫� 㦥 �����ᠫ�� �� 㢥��������
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}