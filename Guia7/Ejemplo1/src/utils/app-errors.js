const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};
/**
 * CustomException: Para el manejo de excepciones
 * @param  {string} name Nombre de la excepcion
 * @param  {Number} statusCode Codigo de estado de la excepcion
 * @param  {string} description Mensaje o descripcion de la excepcion o error
 * @param  {boolean} isOperational Indica si la excepcion es operacional
 * @param  {boolean | object} errorStack Indica mas información del error (Errores de validacion)
 * @param  {boolean} loggingErrorResponse Indica si mostramos el error de la respuesta
 */
class AppError extends Error {
    constructor(name, statusCode, description, isOperational, errorStack, loggingErrorResponse) {
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = loggingErrorResponse;
        Error.captureStackTrace(this, this.errorStack);
    }
}

//api Specific Errors
class APIError extends AppError {
    constructor(name = 'Api Error', 
        statusCode = STATUS_CODES.INTERNAL_ERROR, 
        description = 'Internal Server Error',
        isOperational = true
    ){
        super(name,statusCode,description,isOperational);
    }
}

class BadRequestError extends AppError {
    constructor(description = 'Bad request', 
        loggingErrorResponse = true
    ){
        super('BAD REQUEST', 
            STATUS_CODES.BAD_REQUEST, 
            description, true, false, 
            loggingErrorResponse
        );
    }
}

//400
class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack){
        super('VALIDATION ERROR', 
            STATUS_CODES.BAD_REQUEST,
            description,
            true,
            errorStack
        );
    }
}

//401
class UnAuthorizedError extends AppError {
    constructor(description = "No tienes los suficientes permisos para realizar esta operación"){
        super('UNAUTHORIZED ERROR', STATUS_CODES.UN_AUTHORIZED,
            description,true, false);
    }
}

//403
class ForbiddenError extends AppError {
    constructor(description = "Token de autenticación inválido"){
        super('FORBIDDEN ERROR', STATUS_CODES.FORBIDDEN,
            description,true, false);
    }
}


module.exports = {
    AppError,
    APIError,
    BadRequestError,
    ValidationError,
    UnAuthorizedError,
    ForbiddenError,
    STATUS_CODES,
}