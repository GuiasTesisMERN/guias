// ./src/services/user.services.js
const { UserModel } = require('../models/User');
const UserRepository = require('../models/repository/UserRepository')
const { BadRequestError } = require('../utils/app-errors');
const { generateAccessToken } = require('../utils/Auth');
const mongoose_objectid = require('mongoose/lib/types/objectid');

const _repository = new UserRepository();

module.exports = {
    /**
     * @description Busca en el usuario por email y contraseña, luego retorna los datos y el token de acceso
     * @param {email: string, password: string} userData 
     * @throws {BadRequestError}
     * @returns {email: string, password: string} 
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

    async FindUserById(id) {

        // Validamos que el id sea un objetoID valido de mongo
        if(!mongoose_objectid.isValid(id)) {
            throw new BadRequestError("El usuario que intenta buscar no existe");
        }

        const usuario = await UserModel.findById(id);

        if(usuario === null) {
            throw new BadRequestError("El perfil de este usuario no existe");
        }

        return usuario;
    },

    async CreateNewUser(userData) {
        
        let {nombres, apellidos, email, password} = userData;
        
        const newUser = await _repository.CreateUser(
            nombres, apellidos,
            email, password
        );

        return newUser;
    },

}
