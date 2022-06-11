const express = require('express')
let { verificaToken} = require('../middlewares/autenticacion');
let {consultarRegistros,modificar,guardar,eliminar,consultarRegistro} = require('../controllers/usuarioController')

const router = express.Router();

router.get('/usuario/:id',verificaToken, consultarRegistro);
router.get('/usuarios', verificaToken, consultarRegistros);
router.post('/usuario', guardar);
router.put('/usuario/:id',verificaToken, modificar);
router.delete('/usuario/:id',verificaToken, eliminar);

module.exports = router;




