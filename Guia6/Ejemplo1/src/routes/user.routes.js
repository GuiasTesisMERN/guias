// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login, signUp, profile } = require('../controllers/user.controller');
const { usuarioAutenticado } = require('../middlewares/auth.middleware');
const { validarLogin, validarSignUp } = require('../middlewares/user.middleware');
const asyncHandler = require('../utils/ErrorHandler');

const UserRoute = Router();

UserRoute.post('/login', asyncHandler(validarLogin), asyncHandler(login));
UserRoute.post('/sign_up', asyncHandler(validarSignUp), asyncHandler(signUp));

UserRoute.get('/profile/:id', asyncHandler(usuarioAutenticado), asyncHandler(profile));
UserRoute.put('/edit/:id', asyncHandler(usuarioAutenticado))

module.exports = {
    UserRoute
}
