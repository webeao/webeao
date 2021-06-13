const express = require('express')
let {autenticar} = require('../controllers/loginController')

const router = express.Router();

router.post('/login', autenticar);

module.exports = router;