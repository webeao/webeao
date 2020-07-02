const Usuario = require('../models/usuarioModels');
const bcrypt = require('bcrypt');
const _ = require('underscore');



let consultarRegistros = (req, res) => {


    Usuario.find({})
        .exec((err, datos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                datos
            });

        })
}

let guardar = (req, res) => {

    console.warn(req.body);

    let body = req.body;
    let usuario = new Usuario({
        nombres: body.nombres,
        apellidos: body.apellidos,
        correo: body.correo,
        contraseña: bcrypt.hashSync(body.contraseña, 10),
        pais: body.pais,
        telefono: body.telefono
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(201).json({
            ok: true,
            usuario: usuarioDB
        });

    });

}


let consultarRegistro = (req, res) => {

    let id = req.params.id;

    Usuario.findById(id, (err, usuarioDB)=>{

        if(err){
            return res.status(400).json({
                ok: false,
                usuario: usuarioDB
            });
        }

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })



    })
}

let modificar = (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombres','apellidos','telefono','pais', 'correo','estado','role','contraseña']);

    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

}

let eliminar = (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err

            });
        };

        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado

        });
    });

}

module.exports = {
    consultarRegistros,
    guardar,
    consultarRegistro,
    modificar,
    eliminar
}



