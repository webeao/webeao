const express = require('express');
let { verificaToken} = require('../middlewares/autenticacion');
let {guardarHistoria} = require('../controllers/historiaController')

const router = express.Router();


// router.get();
router.post('/informate',verificaToken, guardarHistoria );
// router.put();
// router.delete();

module.exports = router;
