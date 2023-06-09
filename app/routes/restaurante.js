const express = require('express');

const router = express.Router();

//importar controlador
const restauranteController = require('../controllers/restaurante');

//GET /restaurante
router.get('/', restauranteController.getRestaurantes);

//GET /restaurante/mesas
router.get('/:id/mesas', restauranteController.getMesas);

//POST /restaurante
router.post('/', restauranteController.addRestaurante);

//PUT /restaurante/:id
router.put('/:id', restauranteController.editRestaurante);

//DELETE /restaurante/:id
router.delete('/:id', restauranteController.deleteRestaurante);

//GET /restaurante/mesas

module.exports = router;