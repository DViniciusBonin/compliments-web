document.querySelector('body').onload = function () {

}

const json = localStorage.getItem('_token');
const token = JSON.parse(json).access_token;
fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(res => {
    return res.json();
}).then(user => {
    localStorage.setItem('_user', JSON.stringify({
        user: user.name
    }))
})


const getNameUser = function (key) {
    return JSON.parse(localStorage.getItem(key)).user
}

const name = getNameUser('_user')
document.querySelector('h3').innerHTML = `Olá, ${name} `
