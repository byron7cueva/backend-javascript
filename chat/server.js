const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./network/routes');

// Creando una aplicacion con express
const connection = process.env.CONNECTION || '';
db(connection);
var app = express();

app.use(bodyParser.json()); // Para aceptar infromacion JSON
app.use(bodyParser.urlencoded({extended: false})); //Recibir datos del formulario

routes(app);

// Agregando una ruta sin el uso del roouter
/*
app.use('/', function(req, resp){
    resp.send('Hola');
});*/

// Indicandole que bajo la ruta app, se va servir archivos estáticos
// Los cuales se encuentran en public
app.use('/app', express.static('public'));


app.listen(3000);
console.log('La aplicaciòn esta escuchando desde https://localhost:3000');

