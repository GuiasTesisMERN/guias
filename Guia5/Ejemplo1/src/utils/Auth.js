const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');
const { UnAuthorizedError } = require('./app-errors');

module.exports = {
    /**
     * Funcion para crear token en base al email del usuario
     * @param {string} email 
     * @returns 
     */
    generateAccessToken: (email) => {
        return jwt.sign({email}, APP_SECRET, { expiresIn: '30s' })
    },

    /**
     * Funcion para validar token
     * @param {Request} req 
     * @returns 
     */
    validateTokenSignature: async(req) => {
        const authHeader = req.headers['authorization'];

        if(typeof authHeader === 'undefined') {
            throw new UnAuthorizedError('Authorization Header es requerido en la app');
        }

        const token = authHeader.split(' ')[1];

        if(token === "undefined") {
            throw new UnAuthorizedError('Token inválido');
        }

        const payload = await jwt.verify(token, APP_SECRET, (err) => {
            if(err) {
                console.error(err.expiredAt)
                throw new UnAuthorizedError(err.message)
            }
        });
        
        return payload;
    }
}