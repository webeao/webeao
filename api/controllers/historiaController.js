const express = require('express');
const Historia = require('../models/historiaModels');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

const _ = require('underscore');

app.use(fileUpload());

let guardarHistoria = async (req, res) => {

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

    imagen.mv(`./api/uploads/historia/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            let body = req.body;


            let historia = new Historia({
                titulo: body.titulo,
                descripcion: body.descripcion,
                categoria: body.categoria,
                img: imagen.name,
                //idUsuario: req.usuario._id ,                                 

            });

            historia.save((err, historiaDB) => {
                console.log(historiaDB)
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.status(201).json({

                    ok: true,
                    hitoriaGuardada: {
                        _id: historiaDB._id,
                        titulo: historiaDB.titulo,
                        descripcion: historiaDB.descripcion,
                        categoria: historiaDB.categoria,
                        nombreImagen: historiaDB.img,
                        fecha: historiaDB.fecha,
                        img: "http://179.50.90.135:3001/api/historia/" + historiaDB._id



                    }
                });

                let actualizarHistoria = (historiaDB) => {

                  
                    console.log(historiaDB)
                    let id = historiaDB._id
                    let body = {
                        _id: historiaDB._id,
                        titulo: historiaDB.titulo,
                        descripcion: historiaDB.descripcion,
                        categoria: historiaDB.categoria,
                        nombreImagen: historiaDB.img,
                        fecha: historiaDB.fecha,
                        img: "http://179.50.90.135:3001/api/historia/" + historiaDB._id                     

                    }

                    console.log(body)
                    Historia.findByIdAndUpdate(id, body, (err, usuarioDB) => {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });

                            console.log(usuarioDB)
                        }

                    });



                }
                await = actualizarHistoria(historiaDB);
            });

        }

    });



}


let consultarHistorias = (req, res) => {

    Historia.find({})
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




let consultarHistoria = (req, res) => {
    let id = req.params.id;
    console.log(id);


    Historia.findById(id, (err, historiaDB) => {



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




        let imagen = (historiaDB) => {
            console.log(historiaDB)
            let img = historiaDB.img




            let pathImagen = path.resolve(__dirname, `../uploads/historia/${historiaDB.nombreImagen}`);


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
        await = imagen(historiaDB);

    });


}



let consultarValores = (req,res) =>{

    const valores= [];

    const categorias = ["Movimientos de masa", "Hambruna","Fenómenos atmosféricos","Desastres biológicos","Erupciones", "Fenómenos espaciales","Incendios forestales","Ola de calor","Avalancha","Sequía","Simún","Huracán","Tormenta","Ventisca","Tormenta eléctrica","Tormenta de arena","Tornado","Tormenta solar","Erupción límbica","Erupción volcanica","Incendio forestal","Inundación","Terremoto","Tsunamis"]
    
    
    

    for(let i=0; i<=categorias.length -1; i++){

        
        Historia.countDocuments({ categoria: categorias[i] }, (err, conteo) => {

            let categoria  = categorias[i];

            if(err){
    
                res.json({
                    ok:  false,
                    message
                });
            } 
               
            if(conteo > 0){
                valores.push({conteo, categoria})   
            }
    
               
           
        if(i ==categorias.length -1){
            return res.json({
                ok: true,
                valores
             })



        }
        // const valores= [];
           
        });
        
    }
    
}




// let consultarValores = (req,res) =>{


//     let categorias = ["Tsunami", "ddsfdsfsdfsd"]
//     let valores= [];   

        
//         Historia.countDocuments({ categoria: categorias[1] }, (err, conteo) => {

//             if(err){
    
//                 res.json({
//                     ok:  false
//                 });
//             }
    
//            valores.push({conteo})          
//            console.log(valores)
//         });

//     }
    




module.exports = {
    guardarHistoria,
    consultarHistorias,
    consultarHistoria,
    consultarValores
}