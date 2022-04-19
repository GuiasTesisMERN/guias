const { AppError, STATUS_CODES } = require('./app-errors');
const logger = require('./ErrorLogger')

/**
 * Verifica si el error es de la clase APPError
 * @param {Error} error 
 * @returns 
 */
const isTrustError = (error) => {
    if(error instanceof AppError){
        return error.isOperational;
    }else{
        return false;
    }
}

const ErrorHandler = async(err, req, res, next) => {
    
    //const errorLogger = new ErrorLogger();

    const errorLogger = logger;

    process.on('uncaughtException', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason; // need to take care
    })

    process.on('uncaughtException', (error) => {
        errorLogger.log(error);
        if(errorLogger.isTrustError(err)){
            //process exist // need restart
        }
    })
    
    // console.log(err.description, '-------> DESCRIPTION')
    // console.log(err.message, '-------> MESSAGE')
    // console.log(err.name, '-------> NAME')
    if(err){
        errorLogger.log({level: 'error', message: err});
        if(isTrustError(err)){
            if(err.errorStack){
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({
                    mensaje: errorDescription,
                    error: true
                })
            }
            return res.status(err.statusCode).json({
                mensaje: err.message,
                error: true
            })
        }else{
            console.log(err);
            //process exit // terriablly wrong with flow need restart
        }
        return res.status(STATUS_CODES.INTERNAL_ERROR).json({'message': err.message})
    }
    next();
}

module.exports = ErrorHandler;