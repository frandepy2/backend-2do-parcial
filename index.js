const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();

// Opciones de configuración de Swagger
    const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Backend 2do Parcial API DOCS',
        version: '1.0.0',
        },
    },
    apis: ['./app/routes/*.js'], // Ruta a tus archivos de rutas (puedes ajustarla según tu estructura de carpetas)
    };

    // Inicializar el generador de especificaciones Swagger
    const swaggerSpec = swaggerJsdoc(swaggerOptions);

    // Middleware para mostrar la interfaz de Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//configurar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//importar rutas
const mesaRoutes = require('./app/routes/mesa');
const restauranteRoutes = require('./app/routes/restaurante');
const clienteRoutes = require('./app/routes/cliente');
const reservaRoutes = require('./app/routes/reservas');

app.use('/mesas', mesaRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/clientes', clienteRoutes);
app.use('/reservas', reservaRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});