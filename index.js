const express = require('express');

const app = express();

//configurar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
const restauranteRoutes = require('./app/routes/restaurante');
const clienteRoutes = require('./app/routes/cliente');

app.use('/restaurantes', restauranteRoutes);
app.use('/clientes', clienteRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});