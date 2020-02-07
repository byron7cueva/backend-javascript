const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

/**
 * Permite crear un nuevo chat
 */
router.post('/', function(req, res) {
    controller.addChat(req.body.users)
        .then(chatList => {
            response.success(req, res, chatList, 201);
        })
        .catch(error => {
            response.error(req, res, 'Internal error', 500, error);
        });
});

/**
 * Permite obtener un listado de posts
 */
router.get('/:userId', function(req, res) {
    let userId = req.params.userId || null;
    controller.getChats(userId)
        .then(list => {
            response.success(req, res, list, 200);
        })
        .catch(error => {
            response.error(req, res, 'Internal error', 500, error);
        });
});

module.exports = router;