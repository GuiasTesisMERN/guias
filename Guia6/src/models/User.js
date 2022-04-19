const mongoose = require('mongoose');
const { MONGO_CONSTANTES } = require('../config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre: {
        type: Schema.Types.String,
        maxlength: 50,
        required: true
    },
    apellido: {
        type: Schema.Types.String,
        maxlength: 50,
        required: true
    },
    email: {
        type: Schema.Types.String,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        minlength: 6,
        required: true
    },
}, {
    timestamps: {
        createdAt: MONGO_CONSTANTES.FECHA_CREACION,
        updatedAt: MONGO_CONSTANTES.FECHA_MODIFICACION,
    }
});

module.exports = {
    UserModel: mongoose.model('usuarios', UserSchema)
}