import baseApiUrl from './global.js';

(function () {
    menu.addEventListener('click', () => {
        const opcoes = document.getElementById('opcoes');

        if (opcoes.style.display === 'none') {
            opcoes.style.display = 'block';
        } else {
            opcoes.style.display = 'none';
        }
    });


    const logout = document.getElementById('logout');

    logout.addEventListener('click', () => {
        localStorage.removeItem('_user');
        localStorage.removeItem('_token');
        window.location = '/';
    });

    const getNameUser = function (key) {
        return JSON.parse(localStorage.getItem(key)).user;
    };

    const nameUser = getNameUser('_user');
    document.querySelector('h3').innerHTML = `Olá, ${nameUser} `;

    const json = localStorage.getItem('_token');
    const token = JSON.parse(json).accessToken;

    fetch(`${baseApiUrl}/tags`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).then(res => {
        res.forEach(element => {
            document.querySelector('select').innerHTML += `
            <option value="${element.id}">${element.name}</option>
           `;
        });
    });


    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');
    const user = urlParams.get('user');

    document.getElementById('nameUser').value = name;


    const form = document.forms.elogiar;

    form.onsubmit = (event) => {
        event.preventDefault();
        document.querySelector('.button').innerText = 'Enviando elogio...';
        fetch(`${baseApiUrl}/compliments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tag_id: document.querySelector('select').value,
                user_receiver: user,
                message: document.querySelector('textarea').value
            })
        }).then(res => {
            document.querySelector('.button').innerText = 'Elogio enviado para ' + name;

            setTimeout(() => {
                window.location = '/views/colegas.html';
            }, 3000);
        }).catch(err => {
            console.log(err);
            document.querySelector('.button').innerText = 'Não foi possivel enviar elogio para' + name;

            setTimeout(() => {
                window.location = '/views/colegas.html';
            }, 3000);
        });
    };

})();