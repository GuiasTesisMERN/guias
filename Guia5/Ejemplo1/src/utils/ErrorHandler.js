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
    const errorLogger = logger;

    process.on('uncaughtException', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason; // need to take care
    })

    process.on('uncaughtException', (error) => {
        //errorLogger.log(error);
        if(isTrustError(err)){
            //process exist // need restart
        }
    })
    
    if(err){
        if(isTrustError(err)){
            
            errorLogger.log({level: 'error', message: err.message,...err});

            if(err.errorStack) {
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
            //process exit 
            //Ocurrio un error inesperado y deberiamos de reiniciar el proceso y/o servicio
        }
        return res.status(STATUS_CODES.INTERNAL_ERROR).json({
            mensaje: err.message,
            error: true,
        });
    }
    next();
}

module.exports = ErrorHandler;