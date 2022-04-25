const { AppError, STATUS_CODES } = require('./app-errors');
const logger = require('./Logger')

/**
 * Verifica si el error es de la clase APPError
 * @param {Error} error 
 * @returns {boolean}
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
        if(isTrustError(error)){
            //process exist // need restart
		    console.log(`Uncaught Exception: ${error.message}`)
			process.exit(-1);
        }
    })
    
    if(err){
        if(isTrustError(err)){
            
            errorLogger.log('error', err.message, {...err});

            if(err.errorStack) {
                return res.status(err.statusCode).json({
                    mensaje: err.message,
                    detalle: err.errorStack,
                    error: true
                })
            }
            return res.status(err.statusCode).json({
                mensaje: err.message,
                error: true
            })
        }else{
            console.log(err);
            process.exit(-1);
            //process exit 
            //Ocurrio un error inesperado y deberiamos de reiniciar 
            //el proceso y/o servicio
        }
        return res.status(STATUS_CODES.INTERNAL_ERROR).json({
            mensaje: err.message,
            error: true,
        });
    }
    next();
}

module.exports = ErrorHandler;