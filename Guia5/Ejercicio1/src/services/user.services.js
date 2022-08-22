// ./src/services/user.services.js
const { UserModel } = require('../models/User');
const { BadRequestError } = require('../utils/app-errors');
const { generateAccessToken } = require('../utils/Auth');

module.exports = {
    /**
     * @description Busca en el usuario por email y contraseña
     * @param {email: string, password: string} user 
     * @throws {BadRequestError}
     * @returns {email: string, password: string} data
     */
    async FindUserByEmailAndPassword(user) {
        const { email, password } = user;
        
        const existeEmail = UserModel.find(u => u.email === email);

        if(!existeEmail) {
            throw new BadRequestError('Email no existe en los registros.');
        }

        const data = UserModel.find(u => u.email === email && u.password === password);

        if(data === undefined) {
            throw new BadRequestError('Email y/o clave incorrecta');
        }

        data.token = generateAccessToken(email);

        return data;
    }
}
