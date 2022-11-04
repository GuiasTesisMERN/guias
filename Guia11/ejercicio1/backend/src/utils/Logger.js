const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf, colorize } = format;
const path = require('path');
const { Console } = require('winston/lib/winston/transports');

const logObj = {
    directory: path.resolve(path.dirname(__dirname), './', '../', 'logs'),
    fileSize: 10000, //Max size Bytes (10 KB)
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
        splat(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
    ),
    transports: [
        new transports.Console({
            format: colorize({
                all: true,
            }),
            silent: false
        }),
        new transports.File({
            dirname: logObj.directory,
            filename: "app_logs.log",
            maxFiles: logObj.numberOfFiles, // Crea 3 archivos y elimina el ultimo creado cuando supera la cifra indicada
            maxsize: logObj.fileSize, //Max size Bytes (10 KB)
        })
    ]
});

module.exports = logger;