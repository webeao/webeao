const Informate = require('../models/informateModels')
const _ = require('underscore');

let guardarInformate = (req, res) => {

    let body = req.body;
    console.log(body);
    let informate = new Informate({
        titulo: body.titulo,
        descripcion: body.descripcion,
        categoria: body.categoria,
        idUsuario: req.usuario._id

    });

    informate.save((err, informateDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(201).json({
            ok: true,
            usuario: informateDB
        });

    });


}

module.exports = {
    guardarInformate
}