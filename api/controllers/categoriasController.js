const express = require('express');
const Categorias = require('../models/categoriasModels');


let consultarCategorias = (req, res) => {

    Categorias.find({})
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                categorias
                
            });

        })
}

module.exports= {
    consultarCategorias
}


