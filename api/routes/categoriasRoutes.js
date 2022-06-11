const express = require('express')
let {consultarCategorias, guardar, consultarCategoria} = require('../controllers/categoriasController');
let {verificaToken} = require('../middlewares/autenticacion');
const router = express.Router();


router.get('/categorias', consultarCategorias);
router.get('/categorias/:id', consultarCategoria);
router.post('/categorias',verificaToken, guardar);


module.exports = router;