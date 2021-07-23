function verifYBot() {
    const result = prompt("confirme que não é um robô, html é uma linguagem de programação ? Responsa s para sim e n para não")
    if (result !== 'n') {
        window.location = "/index.html"
    }
}
verifYBot()


const btnSignin = document.getElementById('signin')


btnSignin.addEventListener('click', () => {
    const email = document.forms.login[0].value
    const password = document.forms.login[1].value

    function login() {
        const ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/auth')
        ajax.setRequestHeader('Content-type', '	application/json; charset=utf-8')
        const user = {
            email: email,
            password: password
        }
        ajax.send(JSON.stringify(user))

        ajax.addEventListener("readystatechange", function () {
            if (ajax.readyState === 4 && ajax.status === 200) {

                const response = JSON.parse(ajax.response)

                localStorage.setItem('_token', JSON.stringify({
                    access_token: response.access_token
                }))
                console.log(response)
                window.location = '/views/profile-user-compliments.html'
            }
        })
    }

    login();

})