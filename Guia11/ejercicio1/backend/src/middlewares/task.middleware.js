const Validator = require('validatorjs');
Validator.useLang('es');

const { ValidationError } = require('../utils/app-errors');

module.exports = {
    async validarCreateNewTask(req, res, next) {

        let rules = {
            titulo: 'required|max:50',
            prioridad: 'min:1|max:5',
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