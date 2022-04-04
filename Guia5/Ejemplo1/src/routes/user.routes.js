// ./scr/routes/user.routes.js
const { Router } = require('express');
const { ingresar } = require('../controllers/user.controller');

const UserRoute = Router();

UserRoute.get('/', ingresar);

module.exports = {
    UserRoute
}
