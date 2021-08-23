import baseApiUrl from './global.js';
import '../../libraries/jquery.js';

function verifYBot() {
    const result = prompt('confirme que não é um robô, html é uma linguagem de programação ? Responsa s para sim e n para não');
    if (result !== 'n') {
        window.location = '/index.html';
    }
}
verifYBot();


const btnSignin = document.getElementById('signin');


btnSignin.addEventListener('click', () => {
    const email = document.forms.login[0].value;
    const password = document.forms.login[1].value;

    if (email === "" || password === "") {
        $('div.alert ').removeClass('alert').addClass('warning').html('Por favor, para entrar digite email e senha!')
        return;
    }

    function login() {
        btnSignin.value = 'Entrando...';
        const ajax = new XMLHttpRequest();
        ajax.open('POST', `${baseApiUrl}/auth`);
        ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        const user = {
            email: email,
            password: password
        };
        ajax.send(JSON.stringify(user));

        ajax.addEventListener('readystatechange', function () {
            if (ajax.readyState === 4 && ajax.status === 200) {

                const response = JSON.parse(ajax.response);

                localStorage.setItem('_token', JSON.stringify({
                    accessToken: response.accessToken
                }));
                window.location = '/views/profile-user-compliments.html';
            }

            if (ajax.readyState === 4 && ajax.status === 400) {
                $('.alert ').css('display', 'block');
                btnSignin.value = 'Entrar';
            }
        });


    }

    login();

});