// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword, FindUserByEmail } = require('../services/user.services');

module.exports = {
    async login(req, res) {
        const usuarioReqData = req.body;

        const usuario = await FindUserByEmailAndPassword(usuarioReqData);
        
        res.status(200).json(
            {
                mensaje: "Usuario logeado",
                estado: true,
                datos: usuario
            }
        );
    },

    async rutaProtegida (req, res) {
        res.status(200).json({
            mensaje: "Puede acceder a rutas protegidas",
            estado: true
        })
    }
}