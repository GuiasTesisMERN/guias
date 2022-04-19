// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login } = require('../controllers/user.controller');
const { validarLogin } = require('../middlewares/user.middleware');
const UserRoute = Router();

/**
 * Manejo de errores global
 * @param {function} fn 
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

UserRoute.get('/login', asyncHandler(validarLogin), asyncHandler(login));

module.exports = {
    UserRoute
}
