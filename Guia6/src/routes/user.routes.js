// ./scr/routes/user.routes.js
const { Router } = require('express');
const { login } = require('../controllers/user.controller');
const UserRoute = Router();

/**
 * Manejo de errores global
 * @param {*} fn 
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

UserRoute.get('/login', asyncHandler(login));

module.exports = {
    UserRoute
}
