const express = require('express');
const response = require('../../network/response');

const router = express.Router();

router.get('/', function(req, resp) {
    // Información de las cabeceras enviadas
    console.log(req.headers);

    //Enviando las cabeceras al cliente
    resp.header({
        "custom-header": "Header con valor personalizado" //Definiendo cabecera personalizada
    });

    //resp.send('Lista de mensajes');
    response.success(req, resp, 'Lista de mensajes');
});

router.post('/', function(req, resp) {
    // Información del query
    console.log(req.query);
    // Información del body
    console.log(req.body);

    // Devolver una respuesta plana
    // resp.send('Se añadio el mensaje');

    //Devolver solamente un estado
    //resp.status(201).send();

    //Devolviendo un objeto
    //resp.status(201).send([{error: '', body: 'Creado correctamente'}]);

    if(req.query.error == 'ok') {
        response.error(req, resp, 'Error inesperado', 500, 'Es solo una simulacion de los errores');
    } else {
        response.success(req, resp, 'Creado correctamente', 201);
    }
});

module.exports = router;