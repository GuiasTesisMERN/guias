const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)
            },
            message: 'Formato de email no es válido'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La clave debe de contener mínimo 6 cáracteres']
    },
    
}, {
    timestamps: {
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_modificacion'
    },
    versionKey: false
});

module.exports = {
    UserModel: mongoose.model('usuario', UserSchema)
};