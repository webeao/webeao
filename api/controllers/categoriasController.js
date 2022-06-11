
const express = require('express');
const Categorias = require('../models/categoriasModels');
const fs = require('fs');






let guardar = (req, res) => {
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

    imagen.mv(`./api/uploads/categorias/${nombreArchivo}`, (err) => {
        if (err) {
            console.log("ERROR", err)
        } else {

            console.warn(req.body);
            let body = req.body;
            let categoria = new Categorias({
                nombre: body.nombre,
                descripcion:  body.descripcion,
                imagen: imagen.name

            });
            categoria.save((err, categoriaDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.status(201).json({
                    ok: true,
                    categoria: {
                        _id: categoriaDB._id,
                        nombre: categoriaDB.nombre,
                        descripcion: categoriaDB.descripcion,   
                        nombreImagen:  categoriaDB.imagen,                
                        imagen: `${process.env.API_URL}/api/categirias/` + categoriaDB._id                     
    
                    }
                });


                let actualizarCategoria = (categoriaDB) => {                  
                    console.log('categoriaDBBBB', categoriaDB)
                    let id = categoriaDB._id
                    let body = {
                        _id: categoriaDB._id,
                        nombre: categoriaDB.nombre,
                        descripcion: categoriaDB.descripcion,   
                        nombreImagen:  categoriaDB.imagen,                 
                        imagen: `${process.env.API_URL}/api/categirias/` + categoriaDB._id                     
    
                    }
    
                    console.log('bodysss', body)
                    Categorias.findByIdAndUpdate(id, body, (err, categoriasDB) => {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
    
                        }else{
                            console.log('categoriaDB FINAL', categoriasDB) 
                        }
    
                    });
    
    
    
                }
                 await = actualizarCategoria(categoriaDB);




            });


            

        }
    });




}

let consultarCategoria = (req, res) => {
    let id = req.params.id;
    console.log('oeoeooe', req.params.id),
        Categorias.findById(id, (err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    usuario: err
                });
            }
            // return res.status(200).json({
            //     ok: true,
            //     categoria: categoriaDB
            // })


            let imagen = (categoriaDB) => {
                console.log(categoriaDB)
                let imgen = categoriaDB.imgen   
                let pathImagen = path.resolve(__dirname, `../uploads/categorias${categoriaDB.nombreImagen}`);
                if (fs.existsSync(pathImagen)) {    
                    res.sendFile(pathImagen)
                    console.log(pathImagen)
                } else {
                    let noImagePath = path.resolve(__dirname, '../uploads/no-image.jpg');
                    res.sendFile(noImagePath)
                }
                console.log(pathImagen)
            }
           
            await = imagen(categoriaDB);
            





        })
}




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



module.exports = {
    guardar,
    consultarCategoria,
    consultarCategorias
}


