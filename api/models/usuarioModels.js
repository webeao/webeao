const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombres: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellidos: {
        type: String,
        required: [true, 'el apellido es requerido']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    contraseña: {
        type: String,
        required: [true, 'El password es requerido']
    },
    pais: {
        type: String,
        required: [true, 'El pais es requerido']
    },
    telefono: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    }




});


usuarioSchema.plugin(uniqueValidator, {message: '{PATH} El email debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema)