// ./src/controllers/user.controller.js
const { FindUserByEmailAndPassword, FindUserByEmail } = require('../services/user.services');

const login = async (req, res) => {
    const usuarioReqData = req.body;

    const usuario = await FindUserByEmailAndPassword(usuarioReqData);
    
    res.status(200).json(
        {
            mensaje: "Usuario logeado",
            estado: true,
            datos: usuario
        }
    );
}

module.exports = {
    login: login
}