const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

/**
 * Obtener mensajes
 */
router.get('/', function(req, resp) {
    /*
    // Información de las cabeceras enviadas
    console.log(req.headers);

    //Enviando las cabeceras al cliente
    resp.header({
        "custom-header": "Header con valor personalizado" //Definiendo cabecera personalizada
    });

    //resp.send('Lista de mensajes');
    response.success(req, resp, 'Lista de mensajes');*/

    controller.getMessages()
    .then(messageList => {
        response.success(req, resp, messageList, 200);
    })
    .catch(error => {
        response.error(req, resp, 'Unexpected Error', 500, error);
    });
});

/**
 * Crear mensaje
 */
router.post('/', function(req, resp) {
    // Información del query
    // console.log(req.query);
    // Información del body
    // console.log(req.body);

    // Devolver una respuesta plana
    // resp.send('Se añadio el mensaje');

    //Devolver solamente un estado
    //resp.status(201).send();

    //Devolviendo un objeto
    //resp.status(201).send([{error: '', body: 'Creado correctamente'}]);

    // Obteniendo parametros query
    /*
    if(req.query.error == 'ok') {
        response.error(req, resp, 'Error inesperado', 500, 'Es solo una simulacion de los errores');
    } else {
        response.success(req, resp, 'Creado correctamente', 201);
    }*/

    controller.addMessage(req.body.user, req.body.message)
    .then(fullMessage => {
        response.success(req, resp, fullMessage, 201);
    })
    .catch(error => {
        response.error(req, resp, 'Informción invalida', 400, 'Error en el controlador');
    });
});

/**
 * Actualizar mensaje
 */
router.patch('/:id', function(req, res){
    controller.updateMessage(req.params.id, req.body.message)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    });
})

module.exports = router;