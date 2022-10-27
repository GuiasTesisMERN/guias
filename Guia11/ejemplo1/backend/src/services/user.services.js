// ./src/services/user.services.js
const { UserModel } = require('../models/User');
const UserRepository = require('../models/repository/UserRepository');
const { BadRequestError } = require('../utils/app-errors');
const { generateAccessToken } = require('../utils/Auth');
const mongoose_objectid = require('mongoose/lib/types/objectid');

const _repository = new UserRepository();

/**
     * @description Busca en el usuario por email y contraseña, luego retorna los datos y el token de acceso
     * @param {email: string, password: string} userData 
     * @throws {BadRequestError}
     * @returns {email: string, password: string} 
     */
const FindUserByEmailAndPassword = async (userData) => {
    const { email, password } = userData;

    const existeEmail = await UserModel.findOne({
        email: email
    })

    if(!existeEmail) {
        throw new BadRequestError('Email no existe en los registros.');
    }

    const userLoginData = await _repository.FindUserByEmailAndPassword(email, password);
    
    if(!userLoginData) {
        throw new BadRequestError('Email y/o clave incorrecta');
    }
    
    return {
        id_usuario: userLoginData._id,
        mensaje: `Usuario ${userLoginData.nombres} ${userLoginData.apellidos} se ha logeado`,
        token: generateAccessToken(email)
    };
}

const FindUserById = async (id) => {

    // Validamos que el id sea un objetoID valido de mongo
    if(!mongoose_objectid.isValid(id)) {
        throw new BadRequestError("El usuario que intenta buscar no existe");
    }

    const usuario = await UserModel.findById(id, {password: 0});

    if(usuario === null) {
        throw new BadRequestError("El perfil de este usuario no existe");
    }

    return usuario;
}

const CreateNewUser = async (userData) => {
        
    let {nombres, apellidos, email, password} = userData;
    
    const newUser = await _repository.CreateUser(
        nombres, apellidos,
        email, password
    );

    return newUser;
}

const GetAllUsers = async () => {
    const users = await UserModel.find({}, {password: 0});

    return users;
}
//resto de metodos ...
module.exports = {
    FindUserByEmailAndPassword,
    FindUserById,
    CreateNewUser,
    GetAllUsers
}
