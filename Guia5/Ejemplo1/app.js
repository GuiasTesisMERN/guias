const express = require('express');
const cors = require('cors');
const { UserRoute } = require('./src/routes/user.routes');

module.exports = async (app) => {
    app.use(express.json( {limit: '1mb'} ));
    app.use(express.urlencoded( { extended: true } ));
    app.use(cors());

    //Routes
    app.use('/user', UserRoute);
    //Manejador de errores
}