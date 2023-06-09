const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());

// Configura el middleware de logging
app.use(morgan('dev')); // '

app.use(cors())

//configurar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//importar rutas
const mesaRoutes = require('./app/routes/mesa');
const restauranteRoutes = require('./app/routes/restaurante');
const clienteRoutes = require('./app/routes/cliente');
const reservaRoutes = require('./app/routes/reserva');
const categoriaRoutes = require('./app/routes/categoria');
const productoRoutes = require('./app/routes/producto');
const consumoRoutes = require('./app/routes/consumo');

app.use('/mesas', mesaRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/clientes', clienteRoutes);
app.use('/reservas', reservaRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/producto', productoRoutes);
app.use('/consumo', consumoRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});