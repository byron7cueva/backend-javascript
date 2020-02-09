const express = require('express');
const config = require('../config');
const router = require('./network');

const app = express();
app.use(express.json());

// Routes
app.use('/', router);

app.listen(config.mysqlService.port, () => {
    console.log(`Servicio corriendo y escuchando desde el puerto ${config.mysqlService.port}`);
});