// ./src/controllers/user.controller.js
const httpError = require('express-exception-handler').exception;
const { FindUserByEmailAndPassword } = require('../services/user.services');

module.exports = {
    async login(req, res, next) {
        const usuarioReqData = req.body;

        const usuario = await FindUserByEmailAndPassword(usuarioReqData);
        
        res.status(200).json(
            {
                mensaje: "Usuario encontrado",
                datos: usuario
            }
        );
    },
}