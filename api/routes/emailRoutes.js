const express = require('express')
let ={enviarEmail} = require('../controllers/emailController')

const router = express.Router();


router.post('/contacto', enviarEmail);

module.exports = router;