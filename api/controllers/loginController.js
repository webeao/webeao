const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarioModels');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

let autenticar = (req, res) =>{

    console.log(req.body);
    let body = req.body

    Usuario.findOne({ correo: req.body.correo }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.contraseña, usuarioDB.contraseña)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });



    });






}

module.exports = {
    autenticar
}