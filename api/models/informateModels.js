const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let informateSchema = new Schema({
    img: {
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
    calificacion: { 
        type: Number, 
        required: false,
        default: null
    }

});

module.exports = mongoose.model('Informate', informateSchema)