const express = require('express');
let { verificaToken} = require('../middlewares/autenticacion');
let {guardarCalificacion, consultarCalificacion} = require('../controllers/calificacionController')

const router = express.Router();

router.post('/calificacion', guardarCalificacion );
router.get('/calificacion/:id', consultarCalificacion);




module.exports = router;