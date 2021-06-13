const express = require('express');
let { verificaToken} = require('../middlewares/autenticacion');
let {guardarConsejo, consultarConsejos,consultarConsejo} = require('../controllers/consejosController')

const router = express.Router();

router.get('/consejo/:id',consultarConsejo);
router.get('/consejos',consultarConsejos);
router.post('/consejo', guardarConsejo );
// router.put();
// router.delete();

module.exports = router;