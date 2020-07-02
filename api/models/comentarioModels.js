const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let comentarioSchema = new Schema({
    idHistoria: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }


})

module.exports = mongoose.model('Comentario', comentarioSchema)