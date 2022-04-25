const express = require('express');
const cors = require('cors');
const HandleErrors = require('./src/utils/ErrorHandler');

const { UserRoute } = require('./src/routes/user.routes');
const { APIError, STATUS_CODES } = require('./src/utils/app-errors');

module.exports = async (app) => {
    app.use(express.json( {limit: '10mb'} ));
    app.use(express.urlencoded( { extended: true } ));
    app.use(cors());

    //Routes
    app.use('/user', UserRoute);

    //Solo deberia de acceder aqui si la ruta no existe
    app.use('*', (req, res, next) => {
        throw new APIError(
            "Ruta solicitada no existe", 
            STATUS_CODES.NOT_FOUND, 
            `La ruta "${req.baseUrl}" no esta definida`
        );
    })
    //Manejador de errores
    app.use(HandleErrors)
}