const express = require('express');
const Noticia = require('../models/noticiasModels');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

const _ = require('underscore');

app.use(fileUpload());

let guardarNoticia = async (req, res) => {

    console.log(req.files);

    if (!req.files) {

        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        });
    }


    let imagen = req.files.img;
    let nombreArchivo = `${imagen.name}`;

    imagen.mv(`./api/uploads/noticia/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            let body = req.body;


            let noticia = new Noticia({
                titulo: body.titulo,
                descripcion: body.descripcion,
                img: imagen.name,
                //idUsuario: req.usuario._id ,                                 

            });

            noticia.save((err, noticiaDB) => {
                console.log(noticiaDB)
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.status(201).json({

                    ok: true,
                    noticiaGuardada: {
                        _id: noticiaDB._id,
                        titulo: noticiaDB.titulo,
                        descripcion: noticiaDB.descripcion,
                        nombreImagen: noticiaDB.img,
                        fecha: noticiaDB.fecha,
                        img: "http://179.50.90.135:3002/api/noticia/" + noticiaDB._id



                    }
                });

                let actualizarNoticia = (noticiaDB) => {

                  
                    console.log(noticiaDB)
                    let id = noticiaDB._id
                    let body = {
                        _id: noticiaDB._id,
                        titulo: noticiaDB.titulo,
                        descripcion: noticiaDB.descripcion,
                        nombreImagen: noticiaDB.img,
                        fecha: noticiaDB.fecha,
                        img: "http://179.50.90.135:3002/api/noticia/" + noticiaDB._id                     

                    }

                    console.log(body)
                    Noticia.findByIdAndUpdate(id, body, (err, noticiaDB) => {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });

                        }

                    });



                }
                await = actualizarNoticia(noticiaDB);
            });

        }

    });



}


let consultarNoticias = (req, res) => {

    Noticia.find({})
        .exec((err, noticias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                noticias
                
            });

        })
}




let consultarNoticia = (req, res) => {
    let id = req.params.id;
    console.log(id);


    Noticia.findById(id, (err, noticiaDB) => {



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




        let imagen = (noticiaDB) => {
            console.log(noticiaDB)
            let img = noticiaDB.img




            let pathImagen = path.resolve(__dirname, `../uploads/noticia/${noticiaDB.nombreImagen}`);


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
        await = imagen(noticiaDB);

    });


}






module.exports = {
    guardarNoticia,
    consultarNoticias,
    consultarNoticia
}