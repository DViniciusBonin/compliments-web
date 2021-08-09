
function cookies() {
    confirm("aceitar cookies");
}



cookies();

const buttons = document.getElementsByTagName("a");
buttons[0].href = "/views/login.html";
buttons[1].href = "views/register.html";


function alert() {
    alert("anuncio");
}


setTimeout(() => {
    let x = 0;
    const key = setInterval(() => {
        alert();
        console.log(x);
        x++;

        if (x === 3) {
            clearInterval(key);
        }
    }, 2000);


}, 5000);

