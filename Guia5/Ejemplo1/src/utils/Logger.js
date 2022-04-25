const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;
const path = require('path')

const logDirectory = path.resolve(path.dirname(__dirname), './', '../src', 'logs');
const logFileSize = 1000000; 

const logObj = {
    directory: path.resolve(path.dirname(__dirname), './', '../src', 'logs'),
    fileSize: 1000000, //Max size Bytes (100 KB)
    numberOfFiles: 3
}

const myFormat = printf(({level, message, timestamp, ...metadata}) => {

    //console.log(path.dirname(__dirname));

    //Objeto que construye el mensaje del logger
    let mensaje = `[${level} ${timestamp}] : ${message}`

    if(metadata !== {}) {
        mensaje += '\n' + JSON.stringify(metadata);
    }

    return mensaje
});

const logger = createLogger({
    level: 'info',
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
            level: 'error',
            dirname: logObj.directory,
            filename: "Error.log",
            maxFiles: logObj.numberOfFiles, // Crea 3 archivos y elimina el ultimo creado cuando supera la cifra indicada
            maxsize: logObj.fileSize, //Max size Bytes (100 KB)
        }),
        new transports.File({ 
            level: 'info',
            dirname: logObj.directory,
            filename: "Info.log",
            maxFiles: logObj.numberOfFiles, // Crea 3 archivos y elimina el ultimo creado cuando supera la cifra indicada
            maxsize: logObj.fileSize, //Max size Bytes (100 KB)
        })
    ]
});

module.exports = logger;
