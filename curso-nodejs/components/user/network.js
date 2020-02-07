const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

/**
 * Crear un usuario
 */
router.post('/', function(req, resp) {
    controller.addUser(req.body.name)
        .then(data => {
            response.success(req, resp, data, 201);
        })
        .catch(error => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

/**
 * Obtener los usuarios
 */
router.get('/', function(req, resp) {
    controller.getUsers()
        .then(data => {
            response.success(req, resp, data, 200);
        })
        .catch(error => {
            response.error(req, resp, 'Internal error', 500, error);
        })
});

module.exports = router;