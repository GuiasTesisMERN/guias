// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login, signUp, rutaProtegida } = require('../controllers/user.controller');
const { usuarioAutenticado } = require('../middlewares/auth.middleware');
const { validarLogin, validarSignUp } = require('../middlewares/user.middleware');
const User = require('../models/User');
const UserRoute = Router();

/**
 * Higher order function para manejar las excepciones lanzadas en las demas funciones
 * @param {function} fn 
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

UserRoute.post('/login', asyncHandler(validarLogin), asyncHandler(login));
UserRoute.post('/sign_up', asyncHandler(validarSignUp), asyncHandler(signUp))
UserRoute.get('/esta_autenticado', asyncHandler(usuarioAutenticado), asyncHandler(rutaProtegida))

module.exports = {
    UserRoute
}
