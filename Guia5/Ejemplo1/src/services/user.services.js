// ./src/services/user.services.js
const httpError = require('express-exception-handler').exception;
const Validator = require('validatorjs');
Validator.useLang('es');
const { UserModel } = require('../models/User');
const { BadRequestError } = require('../utils/app-errors');

module.exports = {
    async FindUserByEmailAndPassword(user) {
        const { email, password } = user;

        const data = UserModel.find(u => u.email === email && u.password === password);

        if(data === undefined) {
            throw new BadRequestError('Email y/o clave incorrecta')
        }

        return data;
    }
}
