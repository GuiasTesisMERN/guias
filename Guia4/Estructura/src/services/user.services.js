// ./src/services/user.services.js
const httpError = require('express-exception-handler').exception;
const Validator = require('validatorjs');
Validator.useLang('es');
const { users } = require('../models/User');

module.exports = {
    /**
     * @description Obtener el usuario solicitado por el email de la peticion
     * @param {string} email 
     * @returns object
     */
    getUserByEmail (email) {
        let rules = {
            email: 'required|email'
        }

        let validacion = new Validator({ email }, rules);

        if(validacion.fails()) {
            throw new httpError('Datos enviados incorrectos', 400, validacion.errors.all())
        }

        //Busca al usuario por email con el metodo find
        const usuario = users.find(user => user.email === email);

        if(typeof usuario === "undefined") {
            throw new httpError('Error', 404, "Email no registrado")
        }

        return usuario;
    }
}
