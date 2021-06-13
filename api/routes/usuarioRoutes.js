const express = require('express')
let {consultarRegistros,modificar,guardar,eliminar,consultarRegistro} = require('../controllers/usuarioController')

const router = express.Router();


router.get('/usuario', consultarRegistros);
router.post('/usuario', guardar);
router.get('/usuario/:id', consultarRegistro);
router.put('/usuario/:id', modificar);
router.delete('/usuario/:id', eliminar);

module.exports = router;




