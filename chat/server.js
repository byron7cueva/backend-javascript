const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// Creando una aplicacion con express
var app = express();

// Añadiendo router
app.use(bodyParser.json()); // Para aceptar infromacion JSON
app.use(bodyParser.urlencoded({extended: false})); //Recibir datos del formulario
app.use(router);

// Agregando una ruta sin el uso del roouter
/*
app.use('/', function(req, resp){
    resp.send('Hola');
});*/

router.get('/message', function(req, resp) {
    // Información de las cabeceras enviadas
    console.log(req.headers);

    //Enviando las cabeceras al cliente
    resp.header({
        "custom-header": "Header con valor personalizado" //Definiendo cabecera personalizada
    });

    resp.send('Lista de mensajes');
});

router.post('/message', function(req, resp) {
    // Información del query
    console.log(req.query);
    // Información del body
    console.log(req.body);

    // Devolver una respuesta plana
    // resp.send('Se añadio el mensaje');

    //Devolver solamente un estado
    //resp.status(201).send();

    //Devolviendo un objeto
    resp.status(201).send([{error: '', body: 'Creado correctamente'}]);
});


app.listen(3000);
console.log('La aplicaciòn esta escuchando desde https://localhost:3000');

