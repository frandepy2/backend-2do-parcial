const express = require('express');

const app = express();

//configurar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//importar restaurantes
const restauranteRoutes = require('./app/routes/restaurante');

app.use('/restaurantes', restauranteRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});