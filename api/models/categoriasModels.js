const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const categoriasSchema = new Schema({

    descripcion: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    nombreImagen: {
        type: String,
        required: false,
    }

})

module.exports = mongoose.model('Categorias', categoriasSchema)

