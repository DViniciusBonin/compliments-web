import baseApiUrl from './global.js';

const getNameUser = function (key) {
    return JSON.parse(localStorage.getItem(key)).user;
};

document.querySelector('h3').innerHTML = `Olá, ${getNameUser('_user')} `;

const json = localStorage.getItem('_token');
const token = JSON.parse(json).accessToken;

const menu = document.getElementById('menu');

menu.addEventListener('click', () => {
    const opcoes = document.getElementById('opcoes');

    if (opcoes.style.display === 'none') {
        opcoes.style.display = 'block';
    } else {
        opcoes.style.display = 'none';
    }
});

fetch(`${baseApiUrl}/users`, {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(res => {
    return res.json();
}).then(res => {

    fetch(`${baseApiUrl}/compliments/received`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).then(userCompliments => {

        res.forEach(user => {
            let tags = '';

            for (let i = 0; i < userCompliments.length; i++) {
                if (userCompliments[i].user === user.name) {
                    tags += ` #${userCompliments[i].tag}`;
                }
            }
            document.querySelector('.compliments ul').innerHTML += `
            <li id='${user.id}'>
                <div>
                    <h3>${user.name}</h3>
                    <p>${tags}</p>
                
                </div>
            <button>elogiar</button>
            </li>
            
            `;



        });
    });
});