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
    }
    
    return false;
}

const isMongoError = (error) => {
    //ValidationError es un error manejable en Mongo
    
    let mensaje = false
    if (error.name === 'ValidationError') {
        mensaje = handleValidationErrorMongo(error);
    }

    // El código 11000 indica un error de duplicidad en un campo UNIQUE de la BD de Mongo
    if(error.code === 11000) {
        mensaje = handleDuplicateKeyError(error);
    }

    return mensaje;
}

const handleValidationErrorMongo = (error) => {
    let errors = Object.values(error.errors).map(el => el.message);

    let fields = Object.values(error.errors).map(el => el.path);

    return {
        error: true,
        mensaje: errors,
        campos: fields
    };
}

const handleDuplicateKeyError = (error) => {
    const field = Object.keys(error.keyValue);     
    const errors = `El ${field} ya existe en nuestros registros`;

    return {
        error: true,
        mensaje: errors,
        campo: field
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

    process.on('warning', (error) => {
        console.error("Warning: ", error.message)
    });

    
    if(err){
        
        errorLogger.error(err.message, {...err});
        if(isTrustError(err)){

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
        }
        // Resto del codigo
        const errorMongo = isMongoError(err);
        if(errorMongo) {
            return res.status(STATUS_CODES.BAD_REQUEST).json(errorMongo);
        }

        return res.status(STATUS_CODES.INTERNAL_ERROR).json({
            mensaje: err.message,
            error: true,
        });
    }
    next();
}

module.exports = ErrorHandler;
