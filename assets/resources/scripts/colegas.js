import baseApiUrl from './global.js';



const getNameUser = function (key) {
    return JSON.parse(localStorage.getItem(key)).user;
};

const nameUser = getNameUser('_user');
document.querySelector('h3').innerHTML = `Olá, ${nameUser} `;

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


const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
    localStorage.removeItem('_user');
    localStorage.removeItem('_token');
    window.location = '/';
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
            if (user.name !== nameUser) {
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
                <button id="${user.id}">elogiar</button>
                </li>
            
            `;
            }
        });
    }).then(() => {
        const names = document.querySelectorAll('li div h3');
        const lis = document.querySelectorAll('li button');
        let i = 0;
        lis.forEach(li => {
            const name = names[i].innerHTML;
            li.addEventListener('click', () => {
                window.location = `/views/elogiar.html?user=${li.id}&name=${name}`;
            });

            i++;
        });
    });
});



