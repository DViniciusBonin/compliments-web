"use strict";
const inputsRegister = document.forms.register;

for (const input in inputsRegister) {
    if (input === "0") {

        inputsRegister[input].onfocus = () => {
            inputsRegister[input].placeholder = "Example: Jonas";
        };
        inputsRegister[input].onblur = () => {
            if (inputsRegister[input].value.length < 3) {
                inputsRegister[input].value = "";
                inputsRegister[input].placeholder = "minimo 3 caracteres";
            }

        };
    }

    if (input === "1") {
        inputsRegister[input].onfocus = () => {
            inputsRegister[input].placeholder = "Example: example@example.com";
        };
    }

    if (input > 1) {
        inputsRegister[input].onfocus = () => {
            inputsRegister[input].placeholder = "Digite senhas seguras";
        };
    }
}

function validatePassword() {
    if (document.forms.register.elements[2].value === document.forms.register.elements[3].value) {
        return true;
    }
    return false;
}

inputsRegister[1].addEventListener("invalid", (event) => {
    console.log(event);
    if (inputsRegister[1].validity.typeMismatch) {
        inputsRegister[1].setCustomValidity("Por favor, digite um email válido!");
    } else {
        inputsRegister[1].setCustomValidity("");
    }
});

// inputsRegister[4].onclick = () => {

// };

inputsRegister.onsubmit = (event) => {
    event.preventDefault();
    if (!validatePassword()) {
        window.alert("Senhas não conferem!");
        return false;
    }

    inputsRegister[4].value = "Carregando...";

    let name = inputsRegister.elements[0].value;
    let initial = name.substr(0, 1).toUpperCase();

    name = name.replace(initial.toLowerCase(), initial);
    const user = {
        name: name,
        email: inputsRegister.elements[1].value,
        password: inputsRegister.elements[2].value
    };

    fetch("http://143.198.237.131:3000/users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user)
    }).then(res => {
        console.log(res.data);
        window.alert("Usuário cadastrado com sucesso!");
        window.location = "/views/login.html";
    });
};