const express = require('express');
const { PORT } = require('./src/config');
const expressApp = require('./app');

const StartServer = async() => {
    const app = express();

    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    });
}

StartServer();