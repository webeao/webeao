const express = require('express')
let {consultarCategorias, guardar, consultarCategoria, imagenCategoria} = require('../controllers/categoriasController');
let {verificaToken} = require('../middlewares/autenticacion');
const router = express.Router();


router.get('/categorias', consultarCategorias);
router.get('/categorias/:id', consultarCategoria);
router.get('/categoriasimagen/:id/:imagen', imagenCategoria);
router.post('/categorias',verificaToken, guardar);


module.exports = router;