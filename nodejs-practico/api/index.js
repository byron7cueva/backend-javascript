const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();

// Permitiendo el soporte de JSON para el envio de informacion
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const swaggerDoc = require('./swagger.json');

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.port, () => {
    console.log(`El servidor esta corriendo en el puerto ${config.port}`);
});