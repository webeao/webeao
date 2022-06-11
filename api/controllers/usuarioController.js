const Usuario = require('../models/usuarioModels');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { json } = require('body-parser');


let consultarRegistro = (req, res) => {
    let id = req.params.id;
    console.log('oeoeooe', req.params.id), 
    Usuario.findById(id, (err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                usuario: err
            });
        }
        return res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
}


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
        contrasena: bcrypt.hashSync(body.contrasena, 10),
        pais: body.pais,
        telefono: body.telefono,
        role: body.role
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


let modificar = (req, res) => {
    console.log('paso por aca')
    let id = req.params.id;
    let body = _.pick(req.body, ['nombres','apellidos','telefono','pais', 'correo','estado','role','contrasena']);
    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
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



