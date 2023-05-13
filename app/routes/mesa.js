const express = require('express');

const router = express.Router();

//importar controlador
const mesaController = require('../controllers/mesa');

//GET /mesa
router.get('/', mesaController.getMesas);

//GET /mesa/:id
router.get('/:id', mesaController.getMesaById);

//POST /mesa
router.post('/', mesaController.addMesa);

//PUT /mesa/:id
router.put('/:id', mesaController.editMesa);

//DELETE /mesa/:id
router.delete('/:id', mesaController.deleteMesa);

module.exports = router;