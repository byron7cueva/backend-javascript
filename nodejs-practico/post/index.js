const express = require('express');


const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

// Permitiendo el soporte de JSON para el envio de informacion
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/post', post);

// Es importante ponerlo al ultimo
app.use(errors);

app.listen(config.post.port, () => {
    console.log(`El servicio posts esta corriendo en el puerto ${config.post.port}`);
});