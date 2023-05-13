const express = require('express');

const app = express();

//configurar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//importar mesas
const mesaRoutes = require('./app/routes/mesa');

app.use('/mesa', mesaRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});