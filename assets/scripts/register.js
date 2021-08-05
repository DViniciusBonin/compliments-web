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