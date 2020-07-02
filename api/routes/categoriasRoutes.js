const express = require('express')
let {consultarCategorias} = require('../controllers/categoriasController');

const router = express.Router();


router.get('/categorias', consultarCategorias);


module.exports = router;