const express = require('express');

const router = express.Router();

//importar controlador
const categoriaController = require('../controllers/categoria');

//GET /restaurante
router.get('/', categoriaController.getCategoria);

//POST /restaurante
router.post('/', categoriaController.addCategoria);

//PUT /restaurante/:id
router.put('/:id', categoriaController.editCategoria);

//DELETE /restaurante/:id
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;