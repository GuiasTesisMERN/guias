// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login, signUp, profile } = require('../controllers/user.controller');
const { usuarioAutenticado } = require('../middlewares/auth.middleware');
const { validarLogin, validarSignUp } = require('../middlewares/user.middleware');

const UserRoute = Router();

const asyncHandler = require('../utils/AsyncErrorHandler');

UserRoute.post('/login', asyncHandler(validarLogin), asyncHandler(login));
UserRoute.post('/sign_up', asyncHandler(validarSignUp), asyncHandler(signUp));

UserRoute.get('/profile/:id', asyncHandler(usuarioAutenticado), asyncHandler(profile));
UserRoute.put('/edit/:id', asyncHandler(usuarioAutenticado))

module.exports = {
    UserRoute
}
