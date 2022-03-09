const readline = require('readline');

//Configuración del metodo readline para poder utilizarlo
//Process es un objeto global asi que no necesitamos requerirlo
const rl = readline.createInterface({
    //Entrada de datos
    input: process.stdin,
    //Salida de datos
    output: process.stdout
});

//Metodo para generar un numero aleatorio del 1 al 10
let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);

let res = num1 + num2;

/*
    Metodo del modulo readline "question"
    Recibe 2 parametros
    Primero: La pregunta que le hace al usuario
    Segundo: Callback o funcion que ejecuta luego de que ingresar el valor 
*/
rl.question(`¿Cuanto es ${num1} + ${num2}? \n`, (input) => {
    //trim es para que remueva los espacios en blanco
    if(input.trim() == res) {
        console.log("Respuesta correcta.");
    } else {
        console.log("Respuesta incorrecta.");
    }
    //Cierra el proceso directamente (Ya no tenemos que presionar ctrl + c)
    rl.close();
});
