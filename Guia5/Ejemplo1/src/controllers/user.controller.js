// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword } = require('../services/user.services');

module.exports = {
    async login(req, res, next) {
        const usuarioReqData = req.body;

        const usuario = await FindUserByEmailAndPassword(usuarioReqData);
        
        res.status(200).json(
            {
                mensaje: "Usuario encontrado",
                estado: true,
                datos: usuario
            }
        );
    },
}