const express = require('express');

const router = express.Router();

//importar controlador
const restauranteController = require('../controllers/restaurante');

//GET /restaurante
router.get('/', restauranteController.getRestaurantes);

//POST /restaurante
router.post('/', restauranteController.addRestaurante);

module.exports = router;