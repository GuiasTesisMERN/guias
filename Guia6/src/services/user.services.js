// ./src/services/user.services.js
const httpError = require('express-exception-handler').exception;
const Validator = require('validatorjs');
Validator.useLang('es');
const { users } = require('../models/User');
const UserRepository = require('../models/repository/UserRepository');
const { STATUS_CODES, BadRequestError } = require('../utils/app-errors');

const repository = new UserRepository();

module.exports = {

    async SignUp(user) {
        const { nombres, apellidos, email, password } = user;

        const newUser = await repository.CreateUser({nombres, apellidos, email, password});

        return newUser;
    },

    async FindUserByEmailAndPassword(user) {
        const { email, password } = user;

        const data = await repository.FindUserByEmailAndPassword(user);

        if(data === null) {
            throw new BadRequestError('Datos ingresados de manera incorrecta')
        }

        return data;
    }
}
