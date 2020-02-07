const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const db = require('./db');
const socket = require('./socket');
const routes = require('./network/routes');

var app = express();
var server = http.Server(app);
socket.connect(server);

// Creando una aplicacion con express
const connection = config.dbUrl || '';
db(connection);

app.use(cors());
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
app.use(config.publicRoute, express.static('public'));


server.listen(config.port, function() {
    console.log(`La aplicaciòn esta escuchando desde ${config.host}:${config.port}`);
});

