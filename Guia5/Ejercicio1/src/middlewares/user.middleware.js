// ./scr/middlewares/user.middleware.js
const Validator = require('validatorjs');
Validator.useLang('es');

const { ValidationError } = require('../utils/app-errors');

module.exports = {
    async validarLogin(req, res, next) {
        const { email, password } = req.body;

        let rules = {
            email: 'required|email',
            password: 'required|min:6'
        }

        let validation = new Validator(req.body, rules);

        if(validation.fails()) {
            throw new ValidationError(
                "Los datos ingresados tienen el formato incorrecto", 
                validation.errors.all());
        }

        next();
    },
}