const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let historiaSchema = new Schema({
    img: {
        type: String,
        required: false
    },
    nombreImagen: {
        type: String,
        required: false
    },
    titulo:{
        type: String,
        required: [true, 'El tirulo es requerdo']
    },
    descripcion:{
        type: String,
        required: [true, 'Debes escribir una historia para poder publicar']
    },
    categoria: {
        type: String
    },
    idUsuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    fecha: {
        type: Date,
        default: Date.now

    },
    comentarios: {
        type: [],
        require: false
    }





});

module.exports = mongoose.model('Historia', historiaSchema)