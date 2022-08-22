const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;
const path = require('path')

const logObj = {
    directory: path.resolve(path.dirname(__dirname), './', '../', 'logs'),
    fileSize: 1000000, //Max size Bytes (100 KB)
    numberOfFiles: 3 //Numero maximo de archivos creados
}

const myFormat = printf(({level, message, timestamp, ...metadata}) => {
    let mensaje = `[${level} ${timestamp}] : ${message}`;

    if(JSON.stringify(metadata) !== '{}') {
        mensaje += '\n' + JSON.stringify(metadata);
    }

    return mensaje
});

const logger = createLogger({
    format: combine(
        format.colorize({
            all: true
        }),
        splat(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
    ),
    transports: [
        new transports.Console({
            silent: false
        }),
        new transports.File({ 
            dirname: logObj.directory,
            filename: "app_logs.log",
            maxFiles: logObj.numberOfFiles, // Crea 3 archivos y elimina el ultimo creado cuando supera la cifra indicada
            maxsize: logObj.fileSize, //Max size Bytes (100 KB)
        })
    ]
});

module.exports = logger;