const express = require('express');

const router = express.Router();

const reservasController = require('../controllers/reserva');


// Hacemos un endpoint donde le pasamos el id_cliente, fecha y hora de inicio y fin de la reserva, el id de los restaurante


//POST /reservas
router.post('/create', reservasController.crearReserva);



module.exports = router;