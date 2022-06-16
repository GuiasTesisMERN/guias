// ./src/services/user.services.js
const { UserModel } = require('../models/User');
const UserRepository = require('../models/repository/UserRepository')
const { BadRequestError } = require('../utils/app-errors');
const { generateAccessToken } = require('../utils/Auth');

const _repository = new UserRepository();

module.exports = {
    /**
     * @description Busca en el usuario por email y contraseña
     * @param {email: string, password: string} userData 
     * @throws {BadRequestError}
     * @returns {email: string, password: string} data
     */
    async FindUserByEmailAndPassword(userData) {
        const { email, password } = userData;

        const existeEmail = await UserModel.findOne({
            email: email
        })

        if(!existeEmail) {
            throw new BadRequestError('Email no existe en los registros.');
        }

        const userLoginData = await _repository.FindUserByEmailAndPassword(email, password);
        
        if(userLoginData === undefined) {
            throw new BadRequestError('Email y/o clave incorrecta');
        }
        
        return {
            mensaje: `Usuario ${userLoginData.nombres} ${userLoginData.apellidos} se ha logeado`,
            token: generateAccessToken(email)
        };
    },

    async CreateNewUser(userData) {
        
        let {nombres, apellidos, email, password} = userData;
        
        const newUser = await _repository.CreateUser(
            nombres, apellidos,
            email, password
        );

        return newUser;
    }
}
