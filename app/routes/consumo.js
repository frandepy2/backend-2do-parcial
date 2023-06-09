const express = require('express');

const router = express.Router();

//importar controlador
const consumoController = require('../controllers/consumo');

//POST /Crear un nuevo consumo
router.post('/:id_mesa/:id_cliente/create', consumoController.create);

//POST /Cerrar un consumo
router.post('/:id_cabecera/close', consumoController.close);

//POST /Cambiar de cliente
router.post('/:id_cabecera/customer/change',consumoController.changeCustomer);

//POST /Crea un detalle para una categoria
router.post('/:id_cabecera/detail', consumoController.createDetail);

//DELETE /Elimina un detaller de una categoria
router.delete('/:id_cabecera/:id_detalle/detail/delete',consumoController.deleteDetail);

//GET /Obtenemos un consumo por idMesa
router.get('/:id_mesa',consumoController.getConsumoByIdMesa);

module.exports = router;