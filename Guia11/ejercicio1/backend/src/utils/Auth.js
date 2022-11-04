const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');
const { UnAuthorizedError, ForbiddenError } = require('./app-errors');

module.exports = {
    /**
     * Método para crear token en base al email del usuario
     * @param {string} email 
     * @param {string} id
     * @returns 
     */
    generateAccessToken: (email, id) => {
        return jwt.sign({email, id}, APP_SECRET, { expiresIn: '1h' })
    },

    /**
     * Método para validar token
     * @param {Request} req 
     * @returns 
     */
    validateTokenSignature: async (req) => {
        const authHeader = req.headers['authorization'];

        if(typeof authHeader === 'undefined') {
            throw new UnAuthorizedError('Authorization Header es requerido en la app');
        }

        const token = authHeader.split(' ')[1];

        //Verify: Verifica el token sea valido
        const payload = await jwt.verify(token, APP_SECRET, (err, decoded) => {
            if(err) {
                return false;
            }
            return decoded
        });
        
        return payload;
    }
}