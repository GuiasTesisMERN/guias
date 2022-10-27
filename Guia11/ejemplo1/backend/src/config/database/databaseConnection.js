const mongoose = require('mongoose');
const logger = require('../../utils/Logger');
const { DB_URL } = require('../index');

module.exports = async() => {
    try {
        await mongoose.connect(DB_URL);
        
        logger.info('Base de datos conectada.')
    } catch (error) {
        console.log('Error ============================');
        logger.error(error);
        process.exit(1);
    }
}