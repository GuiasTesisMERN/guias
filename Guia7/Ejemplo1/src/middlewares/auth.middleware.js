const { UnAuthorizedError } = require("../utils/app-errors");
const { validateTokenSignature } = require("../utils/Auth")

module.exports = {
    async usuarioAutenticado (req, res, next) {
        const isAuthorized = await validateTokenSignature(req);
        
        if(!isAuthorized) {
            throw new UnAuthorizedError('No estás autorizado, debe de logearse')
        }

        next();
    }
}