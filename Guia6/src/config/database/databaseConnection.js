const mongoose = require('mongoose');
const { DB_URL } = require('../index');

module.exports = async() => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos conectada.')
    } catch (error) {
        console.log('Error ============================');
        console.log(error);
        process.exit(1);
    }
}