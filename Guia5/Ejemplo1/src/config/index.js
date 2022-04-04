// ./src/config/index.js
const dotenv = require('dotenv');
const constantes = require('./constantes.js');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGO_URI,
    MONGO_CONSTANTES: constantes.MONGO,
}
