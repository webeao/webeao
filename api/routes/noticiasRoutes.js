const express = require('express');
let { verificaToken} = require('../middlewares/autenticacion');
let {guardarNoticia, consultarNoticias,consultarNoticia} = require('../controllers/noticiasController')

const router = express.Router();

router.get('/noticia/:id',consultarNoticia);
router.get('/noticias',consultarNoticias);
router.post('/noticia', guardarNoticia );
// router.put();
// router.delete();

module.exports = router;