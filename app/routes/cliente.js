const express = require('express');

const router = express.Router();

//importar controlador
const controller = require('../controllers/cliente');

//GET /cliente
router.get('/', controller.getClientes);

//POST /cliente
router.post('/', controller.addCliente);

//GET /cliente/:id
router.get('/:id', controller.getClienteById);

//PUT /cliente/:id
router.put('/:id', controller.editCliente);

//DELETE /cliente/:id
router.delete('/:id', controller.deleteCliente);

module.exports = router;