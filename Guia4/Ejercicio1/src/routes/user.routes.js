// ./scr/routes/user.routes.js
const { Router } = require('express');
const { ingresar, actualizarUsuario, obtenerUsuarios } = require('../controllers/user.controller');

const UserRoute = Router();

UserRoute.get('/', ingresar);
UserRoute.put('/:id', actualizarUsuario);
UserRoute.get('/obtener', obtenerUsuarios)

module.exports = {
    UserRoute
}
