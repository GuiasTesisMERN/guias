// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login, signUp, profile, getAllUsers } = require('../controllers/user.controller');
const { usuarioAutenticado } = require('../middlewares/auth.middleware');
const { validarLogin, validarSignUp } = require('../middlewares/user.middleware');

const UserRoute = Router();

/**
 * Higher order function para manejar las excepciones lanzadas en las 
 * demas funciones debe de ir en la rutas
 * @param function fn(req, res, next)
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

UserRoute.post('/login', asyncHandler(validarLogin), asyncHandler(login));

UserRoute.post(
    '/sign_up', 
    asyncHandler(validarSignUp), 
    asyncHandler(signUp)
);

UserRoute.get('/profile/:id',
    asyncHandler(usuarioAutenticado),
    asyncHandler(profile)
);

UserRoute.get('/',
    asyncHandler(usuarioAutenticado),
    asyncHandler(getAllUsers)
);

module.exports = {
    UserRoute
}
