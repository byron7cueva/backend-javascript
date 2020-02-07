const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const config = require('../../config');

const router = express.Router();
const upload = multer({
    dest: `public/${config.filesRoute}`
});

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

    // Obteniendo informacion del filtro
    const filterMessages = req.query.chat || null;

    controller.getMessages(filterMessages)
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
router.post('/', upload.single('file'), function(req, resp) {
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

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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
});

/**
 * Eliminar mensaje
 */
router.delete('/:id', function(req, resp) {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, resp,`Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, resp, 'Error interno', 500, e);
        });
});

module.exports = router;