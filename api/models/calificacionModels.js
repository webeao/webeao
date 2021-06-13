const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionSchema = new Schema({
    idConsejo: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    }


})

module.exports = mongoose.model('Calificacion', calificacionSchema)