/**
 * Higher order function para manejar las excepciones lanzadas en las 
 * demas funciones debe de ir en la rutas
 * @param function fn(req, res, next)
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler;