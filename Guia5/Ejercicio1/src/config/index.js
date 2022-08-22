// ./src/config/index.js
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    APP_SECRET: process.env.APP_SECRET
}
