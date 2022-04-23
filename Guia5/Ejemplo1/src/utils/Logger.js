const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;
const path = require('path')

const myFormat = printf(({level, message, timestamp, ...metadata}) => {

    //console.log(path.dirname(__dirname));

    //Objeto que construye el mensaje del logger
    let mensaje = {
        header: "==================== INICIO ====================\n",
        data: `[${level} ${timestamp}] : ${message}`,
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
        new transports.Console({
            silent: false
        }),
        new transports.File({ 
            filename: `src/logs/app_error.log`,
            maxFiles: 3, // Crea 3 archivos y elimina el ultimo creado cuando supera la cifra indicada
            maxsize: 1000000, //Max size Bytes (100 KB)
            
        })
    ]
});


module.exports = logger;