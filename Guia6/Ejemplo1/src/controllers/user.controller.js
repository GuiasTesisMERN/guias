// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword, CreateNewUser, FindUserById } = require('../services/user.services');
const { validateTokenSignature } = require("../utils/Auth")

module.exports = {
    async login(req, res) {
        const usuarioReqData = req.body;

        const usuario = await FindUserByEmailAndPassword(usuarioReqData);
        
        res.status(200).json(
            {
                mensaje: "Usuario logeado",
                estado: true,
                ...usuario
            }
        );
    },

    async signUp(req, res) {
        const usuarioReqData = req.body;
        const newUser = await CreateNewUser(usuarioReqData);

        res.status(201).json({
            mensaje: "Usuario creado",
            datos: newUser,
            estado: true,
        })
    },

    async profile (req, res) {

        let { id } = req.params;

        const datos = await FindUserById(id);

        const {email} = await validateTokenSignature(req);

        let esPerfil = false;
        if (email === datos.email) {
            esPerfil = true;
        }

        res.status(200).json({
            mensaje: "Puede acceder a rutas protegidas",
            datos: datos,
            miPerfil: esPerfil,
            estado: true
        })
    }
}