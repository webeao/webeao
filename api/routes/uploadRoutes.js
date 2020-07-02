// const express = require('express');
// const fileUpload = require('express-fileupload');
// const app = express();


// const Historia = require('../models/historiaModels')
// const Informate = require('../models/informateModels')


// const fs = require('fs');
// const path = require('path');

// app.use(fileUpload());


// app.put('/upload/:tipo/:id', function(req, res){

//     let tipo = req.params.tipo;
//     let id = req.params.id;

//     if(!req.files){
//         return res.status(400).json({
//             ok: false,
//             err:{
//                 message: 'No se ha seleccionado ningún archivo'
//             }
//         });
//     }

//      // Valida tipo
//      let tiposValidos = ['historia', 'informate'];
//      if (tiposValidos.indexOf(tipo) < 0) {
//          return res.status(400).json({
//              ok: false,
//              err: {
//                  message: 'Los tipos permitidas son ' + tiposValidos.join(', ')
//              }
//          })
//      }

//     let archivo = req.files.archivo;
//     let nombreCortado = archivo.name.split('.');
//     let extension = nombreCortado[1];


//     console.log(extension);


//     let extencionesValidas = ['jpg','png','jpeg','gif','svg']

//     if (extencionesValidas.indexOf(extension) < 0 ){
//     return res.status(400).json({
//         ok: false,
//         err:{
//             message: 'Las extenciones validas son: ' + extencionesValidas.join(', '),
//             ext: extension
//         }
//     })

//     }

//     let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;


//     archivo.mv(`api/uploads/${ tipo }/${ nombreArchivo }`, (err) => {

//         if (err)
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });

//         // Aqui, imagen cargada
//         if (tipo === 'historia') {
//             imagenHistoria(id, res, nombreArchivo);
//         } else {
//             imagenInformate(id, res, nombreArchivo);
//         }

//     });

// });

// function imagenHistoria(id, res, nombreArchivo) {

//     Historia.findById(id, (err, usuarioDB) => {

//         if (err) {
//             borraArchivo(nombreArchivo, 'historia');

//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (!usuarioDB) {

//             borraArchivo(nombreArchivo, 'historia');

//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Historia no existe'
//                 }
//             });
//         }

//         borraArchivo(usuarioDB.img, 'historia')

//         usuarioDB.img = nombreArchivo;

//         usuarioDB.save((err, usuarioGuardado) => {

//             res.json({
//                 ok: true,
//                 usuario: usuarioGuardado,
//                 img: nombreArchivo
//             });

//         });


//     });


// }



// function imagenInformate(id, res, nombreArchivo) {

//     Informate.findById(id, (err, productoDB) => {

//         if (err) {
//             borraArchivo(nombreArchivo, 'informate');

//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (!productoDB) {

//             borraArchivo(nombreArchivo, 'informate');

//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Informate no existe'
//                 }
//             });
//         }

//         borraArchivo(productoDB.img, 'informate')

//         productoDB.img = nombreArchivo;

//         productoDB.save((err, productoGuardado) => {

//             res.json({
//                 ok: true,
//                 producto: productoGuardado,
//                 img: nombreArchivo
//             });

//         });


//     });


// }



// function borraArchivo(nombreImagen, tipo) {

//     let pathImagen = path.resolve(__dirname, `../uploads/${ tipo }/${ nombreImagen }`);
//     if (fs.existsSync(pathImagen)) {
//         fs.unlinkSync(pathImagen);
//     }


// }

// module.exports = app;