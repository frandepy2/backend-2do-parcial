const express = require('express');

const router = express.Router();

//importar controlador
const consumoController = require('../controllers/consumo');

//POST /Crear un nuevo consumo
router.post('/:id_mesa/:id_cliente/create', consumoController.create);

//POST /Cerrar un consumo
router.post('/:id_cabecera/close', consumoController.close);

module.exports = router;