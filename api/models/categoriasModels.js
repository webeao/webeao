const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const categoriasSchema = new Schema({

    descricion: {
        type: String,
        required: true,

    }

})

module.exports = mongoose.model('Categorias', categoriasSchema)

