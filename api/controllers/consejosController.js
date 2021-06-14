const express = require('express');
const Consejo = require('../models/consejosModels');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

const _ = require('underscore');

app.use(fileUpload());

let guardarConsejo = async (req, res) => {

    console.log(req.files);

    if (!req.files) {

        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningúna imagen'
            }
        });
    }


    let imagen = req.files.img;
    let nombreArchivo = `${imagen.name}`;

    imagen.mv(`./api/uploads/consejo/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            let body = req.body;


            let consejo = new Consejo({
                titulo: body.titulo,
                descripcion: body.descripcion,
                img: imagen.name,
                calificacion: body.calificacion,
                //idUsuario: req.usuario._id ,                                 

            });

            consejo.save((err, consejoDB) => {
                console.log(consejoDB)
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.status(201).json({

                    ok: true,
                    consejoGuardado: {
                        _id: consejoDB._id,
                        titulo: consejoDB.titulo,
                        descripcion: consejoDB.descripcion,
                        nombreImagen: consejoDB.img,
                        fecha: consejoDB.fecha,
                        calificacion: consejoDB.calificacion,
                        img: "http://179.50.90.135:3002/api/noticia/" + consejoDB._id



                    }
                });

                let actualizarConsejo = (consejoDB) => {


                    console.log(consejoDB)
                    let id = consejoDB._id
                    let body = {
                        _id: consejoDB._id,
                        titulo: consejoDB.titulo,
                        descripcion: consejoDB.descripcion,
                        nombreImagen: consejoDB.img,
                        fecha: consejoDB.fecha,
                        img: "http://179.50.90.135:3002/api/noticia/" + consejoDB._id

                    }

                    console.log(body)
                    Consejo.findByIdAndUpdate(id, body, (err, consejoDB) => {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }
                    });
                }
                await = actualizarConsejo(consejoDB);
            });
        }
    });
}


let consultarConsejos = (req, res) => {

    Consejo.find({})
        .exec((err, consejosDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                consejos: consejosDB

            });

        })
}

let consultarConsejo = (req, res) => {
    let id = req.params.id;
    console.log(id);

    Consejo.findById(id, (err, consejoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'la locura',
                err
            });
        }

        // let historia = (historiaDB) => {

        //     if (!historiaDB) {
        //         return res.json({
        //             ok: false,
        //             message: "No se encontro la historia"

        //         })
        //     }
        //     res.json({
        //         historia: historiaDB
        //     })
        // }




        let imagen = (consejoDB) => {
            console.log(consejoDB)
            let img = consejoDB.img

            let pathImagen = path.resolve(__dirname, `../uploads/consejo/${consejoDB.nombreImagen}`);

            if (fs.existsSync(pathImagen)) {

                res.sendFile(pathImagen)
                console.log(pathImagen)
            } else {
                let noImagePath = path.resolve(__dirname, '../uploads/no-image.jpg');
                res.sendFile(noImagePath)
            }
            console.log(pathImagen)
        }
        // await = historia(historiaDB);
        await = imagen(consejoDB);

    });
}


module.exports = {
    guardarConsejo,
    consultarConsejos,
    consultarConsejo
}