function cookies() {
    const cookies = confirm('aceitar cookies')
}



const buttons = document.getElementsByTagName('a')
buttons[0].href = "/views/login.html"
buttons[1].href = "views/register.html"



setTimeout(() => {
    let x = 0;
    const key = setInterval(() => {
        alert('anuncio')
        console.log(x)
        x++;

        if (x == 3) {
            clearInterval(key)
        }
    }, 2000)


}, 5000)

