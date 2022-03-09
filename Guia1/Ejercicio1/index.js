const { sumar, restar, multiplicar, dividir } = require("./operaciones");

console.log("Sumar 2 + 2: ", sumar(2,2));
console.log("Restar 2 - 2: ", restar(2,2));
console.log("Multiplicar 2 * 3: ", multiplicar(2,3));
console.log("Dividir 2 / 0: ", dividir(2,0));
console.log("Dividir 4 / 2: ", dividir(4, 2))