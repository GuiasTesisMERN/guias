const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const fecha = new Date();

const fechaLogger = {
    dia: fecha.getDate(),
    mes: fecha.getMonth(),
    anyo: fecha.getFullYear(),
}

const myFormat = printf(({level, message, timestamp, ...metadata}) => {

    let mensajeHeader = "==================== INICIO ====================\n";
    let mensajeFooter = "\n==================== FINAL  ====================\n";

    let mensaje = `${level} [${timestamp}] : ${message}`;

    if(metadata) {
        mensaje += '\n' + JSON.stringify(metadata);
    }

    return mensajeHeader + mensaje + mensajeFooter;
});

const logger = createLogger({
    format: combine(
        format.colorize(),
        splat(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ 
            
            filename: `src/logs/app_error_${fechaLogger.mes}_${fechaLogger.dia}_${fechaLogger.anyo}.log`,
            maxFiles: 3,
            maxsize: 1000000, //Max size Bytes
            
        })
    ]
});


module.exports = logger;