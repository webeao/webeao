const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let noticiaSchema = new Schema({
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
    idUsuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    fecha: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Noticia', noticiaSchema)