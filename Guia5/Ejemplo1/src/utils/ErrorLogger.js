const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const fecha = new Date();

const fechaLogger = {
    dia: fecha.getDate(),
    mes: fecha.getMonth(),
    anyo: fecha.getFullYear(),
}

const myFormat = printf(({level, message, timestamp, ...metadata}) => {

    let mensaje = {
        header: "==================== INICIO ====================\n",
        data: `${level} [${timestamp}] : ${message}`,
        footer: "\n==================== FINAL  ====================\n"
    }

    if(metadata) {
        mensaje.data += '\n' + JSON.stringify(metadata);
    }

    return mensaje.header + mensaje.data + mensaje.footer;
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
            maxFiles: 3, // Crea 3 archivos y elimina el ultimo creado cuando supera la cifra indicada
            maxsize: 1000000, //Max size Bytes (100 KB)
            
        })
    ]
});


module.exports = logger;