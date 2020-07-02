const express = require('express');
const Calificacion = require('../models/calificacionModels')



let guardarCalificacion = (req, res) => {

    let body = req.body;

    console.log(body)

    let calificacion = new Calificacion({
        idConsejo: body.idConsejo,
        valor: body.valor

    });
    console.log(calificacion);

    calificacion.save((err, calificacionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password= null;
        res.json({
            ok: true,
            calificacion: calificacionDB

        });
        // console.log(comentarioDB)
    });

}




let consultarCalificacion = (req, res) => {
    console.log(req.params)


    Calificacion.find({ idConsejo: req.params.id }, (err, calificacionDB) => {
        // let conteo = 0;consejoD
        let acumulador = 0;

        for(let calificacion of calificacionDB){
            acumulador += calificacion.valor
        }

        let promedio = (acumulador / calificacionDB.length);


        console.log(calificacionDB)
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }


        res.status(200).json({
            ok: true,
            calificacion: promedio
        })





    })

}


module.exports = {
    guardarCalificacion,
    consultarCalificacion
}

