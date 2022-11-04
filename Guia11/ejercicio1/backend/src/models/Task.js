const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    titulo: {
        type: String,
        maxlength: [50, "El titulo no puede superar los 50 carácteres"],
        required: true,
    },
    detalle: {
        type: String,
    },
    prioridad: {
        type: Number,
        require: true,
        default: 1,
        min: [1, 'La prioridad no debe de ser menor a 1'],
        max: [5, 'La prioridad no debe de ser mayor a 5'],
    },
    finalizado: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: "usuario"
    }
}, {
    timestamps: {
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_modificacion'
    },
    versionKey: false,
});

module.exports = {
    TaskModel: mongoose.model('tarea', TaskSchema)
}