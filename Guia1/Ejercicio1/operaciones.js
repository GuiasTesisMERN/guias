const sumar = (num1, num2) => num1 + num2;

const restar = (num1, num2) => num1 - num2;

const multiplicar = (num1, num2) => num1 * num2;

const dividir = (num1, num2) => {
    if(num2 === 0) {
        return "No puede dividir entre 0";
    }
    return num1 / num2
}

module.exports = {
    sumar: sumar,
    restar: restar,
    multiplicar: multiplicar,
    dividir: dividir
}