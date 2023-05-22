const express = require('express');

const router = express.Router();

//importar controlador
const controller = require('../controllers/cliente');

/**
 * @swagger
 * /cliente:
 *   get:
 *     summary: Obtener todos los clientes
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
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