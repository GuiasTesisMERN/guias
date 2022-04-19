const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

class AppError extends Error {
    constructor(name, statusCode, description, isOperational, errorStack, loggingErrorResponse) {
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = loggingErrorResponse;
        Error.captureStackTrace(this);
    }
}

//api Specific Errors
class APIError extends AppError {
    constructor(name = 'Api Error', statusCode = STATUS_CODES.INTERNAL_ERROR, description ='Internal Server Error',isOperational = true,){
        super(name,statusCode,description,isOperational);
    }
}

//400
class BadRequestError extends AppError {
    constructor(description = 'Bad request', loggingErrorResponse = true){
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST,description,true, false, loggingErrorResponse);
    }
}

//400
class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack){
        super('VALIDATION ERROR', STATUS_CODES.BAD_REQUEST,description,true, errorStack);
    }
}

class UnAuthorizedError extends AppError {
    constructor(description = 'UnAuthorized'){
        super('UNAUTHORIZED ERROR', STATUS_CODES.UN_AUTHORIZED,
            description = "No tienes los suficientes permisos para realizar esta operación",true, false);
    }
}


module.exports = {
    AppError,
    APIError,
    BadRequestError,
    ValidationError,
    STATUS_CODES,
}