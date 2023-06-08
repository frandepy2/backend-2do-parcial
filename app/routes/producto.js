const express = require('express');

const router = express.Router();

//importar controlador
const productoController = require('../controllers/producto');

//GET /producto
router.get('/', productoController.getProductos);

//GET /producto por categoria
router.get('/idCategoria/:idCategoria', productoController.getProductosByCategoria);

//GET /producto/:id
router.get('/:id', productoController.getProductoById);

//POST /producto
router.post('/', productoController.addProducto);

//PUT /producto/:id
router.put('/:id', productoController.editProducto);

//DELETE /producto/:id
router.delete('/:id', productoController.deleteProducto);

module.exports = router;