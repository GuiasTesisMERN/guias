// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword, CreateNewUser, FindUserById, GetAllUsers } = require('../services/user.services');
const { validateTokenSignature } = require("../utils/Auth");

const login = async (req, res) => {
    const usuarioReqData = req.body;

    const usuario = await FindUserByEmailAndPassword(usuarioReqData);

    res.status(200).json(
        {
            mensaje: "Usuario logeado",
            estado: true,
            ...usuario
        }
    );
}

const signUp = async (req, res) => {
    const usuarioReqData = req.body;
    const newUser = await CreateNewUser(usuarioReqData);

    res.status(201).json({
        mensaje: "Usuario creado",
        datos: newUser,
        estado: true,
    })
};

const profile = async (req, res) => {

    let { id } = req.params;

    const datos = await FindUserById(id);

    res.status(200).json({
        datos: datos,
        estado: true
    })
};

const getAllUsers = async (req, res) => {
    const datos = await GetAllUsers();

    res.status(200).json({
        usuarios: datos
    });
}

module.exports = {
    login,
    signUp,
    profile, 
    getAllUsers
}