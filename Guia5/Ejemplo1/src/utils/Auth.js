const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');
const { UnAuthorizedError } = require('./app-errors');

module.exports = {
    /**
     * 
     * @param {string} email 
     * @returns 
     */
    generateAccessToken: (email) => {
        return jwt.sign({email}, APP_SECRET, { expiresIn: '30s' })
    },

    validateTokenSignature: async(req) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(token === null) {
            throw new UnAuthorizedError('No se encontró un token válido en la petición');
        }

        const payload = await jwt.verify(token, APP_SECRET);
        
        return payload;
    }
}