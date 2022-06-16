// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword, CreateNewUser } = require('../services/user.services');

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
        const newUser = await CreateNewUser(req.body);

        res.status(201).json({
            mensaje: "Usuario creado",
            estado: true,
        })
    },

    async rutaProtegida (req, res) {
        res.status(200).json({
            mensaje: "Puede acceder a rutas protegidas",
            estado: true
        })
    }
}