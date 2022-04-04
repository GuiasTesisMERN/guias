// ./src/controllers/user.controller.js
const httpError = require('express-exception-handler').exception;
const { getUserByEmail, SignUp } = require('../services/user.services');

module.exports = {
    ingresar(req, res) {
        try {
            const { email } = req.body;

            const usuario = getUserByEmail(email);

            res.status(200).json(
                {
                    mensaje: "Datos enviados exitosamente",
                    datos: usuario
                }
            );
        } catch (error) {
            if(error instanceof httpError) {
                res.status(error.status).json(
                    {
                        mensaje: error.message,
                        error: true,
                        errores: error.response
                    }
                );
            } else {
                res.status(500).json({
                    mensaje: "Ocurrio un error",
                    error: true,
                    log: error.message
                });
            }
        }
    },

    registrarse(req, res) {
        try {
            const { nombres, apellidos, email, password } = req.body;

            const usuario = SignUp({ nombres, apellidos, email, password });

            res.status(200).json(
                {
                    mensaje: "Datos enviados exitosamente",
                    datos: usuario
                }
            );
        } catch (error) {
            if(error instanceof httpError) {
                res.status(error.status).json(
                    {
                        mensaje: error.message,
                        error: true,
                        errores: error.response
                    }
                );
            } else {
                res.status(500).json({
                    mensaje: "Ocurrio un error",
                    error: true,
                    log: error.message
                });
            }
        }
    }
}