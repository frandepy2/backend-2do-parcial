const express = require('express');

const router = express.Router();

//importar controlador
const restauranteController = require('../controllers/mesa');

//GET /mesa
router.get('/', restauranteController.getMesas);

module.exports = router;