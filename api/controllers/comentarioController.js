const express = require('express');
const Comentario = require('../models/comentarioModels')
const Historia = require('../models/historiaModels')
const _ = require('underscore');


let guardarComentario = async (req, res) => {

    let body = req.body;

    // console.log(body)

    let comentario = new Comentario({
        idHistoria: body.idHistoria,
        descripcion: body.descripcion

    });
    console.log(comentario);

    comentario.save((err, comentarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password= null;
        res.json({
            ok: true,
            comentario: comentarioDB

        });
        // console.log(comentarioDB)
    });

}

let consultarComentarios = (req, res) => {

    Comentario.find({})
        .exec((err, historias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                historias
            });

        })
}


let consultarComentario = (req, res) => {
console.log(req.params)


    Comentario.find({ idHistoria:req.params.id}, (err, comentariosDB) => {

        // console.log(comentariosDB)
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }


       res.status(200).json({
            ok: true,
            comentarios: comentariosDB
        })





    })

}


module.exports = {
    guardarComentario,
    consultarComentarios,
    consultarComentario
}

