const express = require('express');
const { PORT } = require('./src/config');
const expressApp = require('./app');
const logger = require('./src/utils/Logger');
/**
 * Inicializa el servidor de NodeJS
 */
const StartServer = async() => {
    const app = express();

    await expressApp(app);

    app.listen(PORT, () => {
        logger.info(`Servidor corriendo en http://localhost:${PORT}`)
        //console.log(`Servidor corriendo en http://localhost:${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    });
}

StartServer();