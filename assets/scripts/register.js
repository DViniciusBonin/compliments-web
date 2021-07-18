
const inputsRegister = document.forms.register

for (const input in inputsRegister) {
    if (input == 0) {
        inputsRegister[input].onfocus = () => {
            inputsRegister[input].placeholder = 'Example: Jonas'
        }
    }

    if (input == 1) {
        inputsRegister[input].onfocus = () => {
            inputsRegister[input].placeholder = 'Example: example@example.com'
        }
    }

    if (input > 1) {
        inputsRegister[input].onfocus = () => {
            inputsRegister[input].placeholder = 'Digite senhas seguras'
        }
    }
}