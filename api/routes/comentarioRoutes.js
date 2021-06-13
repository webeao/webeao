const express = require('express');
let { verificaToken} = require('../middlewares/autenticacion');
let {consultarComentario, consultarComentarios, guardarComentario} = require('../controllers/comentarioController')

const router = express.Router();

router.post('/comentario', guardarComentario );
router.get('/comentarios', consultarComentarios);
router.get('/comentario/:id', consultarComentario);




module.exports = router;