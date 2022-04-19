const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let mensaje = `${timestamp} [${level}] : ${message}`;

    if(metadata) {
        mensaje += JSON.stringify(metadata);
    }

    return mensaje;
});

const fecha = new Date();

const fechaLogger = {
    dia: fecha.getDate(),
    mes: fecha.getMonth(),
    anyo: fecha.getFullYear(),
}

const logger = createLogger({
    format: combine(
        format.colorize(),
        splat(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ 
            filename: `src/logs/app_error_${fechaLogger.mes}_${fechaLogger.dia}_${fechaLogger.anyo}.log`,
        })
    ]
});


module.exports = logger;