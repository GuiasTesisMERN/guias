const { validateTokenSignature } = require("../utils/Auth")

module.exports = {
    usuarioAutenticado: async(req, res, next) => {
        const isAuthorized = await validateTokenSignature(req);

        console.log(isAuthorized);

        next();
    }
}