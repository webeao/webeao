const express = require('express')
let ={enviarEmailContacto } = require('../controllers/emailController')

const router = express.Router();


router.post('/contacto', enviarEmailContacto);

module.exports = router;