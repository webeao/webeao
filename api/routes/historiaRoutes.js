const express = require('express');
let { verificaToken} = require('../middlewares/autenticacion');
let {guardarHistoria, consultarHistorias,consultarHistoria, consultarValores} = require('../controllers/historiaController')

const router = express.Router();

router.get('/historia/:id',consultarHistoria);
router.get('/historias',consultarHistorias);
router.post('/historia', guardarHistoria );
router.get('/valores', consultarValores );
// router.put();
// router.delete();

module.exports = router;

