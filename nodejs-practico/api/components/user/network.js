const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');

const router = Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);
router.delete('/:id', remove);

function list(req, res) {
    Controller.list()
        .then(list => {
            response.success(req, res, list);
        })
        .catch(error => {
            response.error(req, res, error);
        });
}

function get(req, res) {
    Controller.get(req.params.id)
        .then(user => {
            response.success(req, res, user);
        })
        .catch(error => {
            response.error(req, res, error);
        });
}

function upsert(req, res) {
    Controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user);
        })
        .catch(error => {
            response.error(req, res, error);
        });
}

function remove(req, res) {
    Controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, 'Se elimino correctamente');
        })
        .catch(error => {
            response.error(req, res, error);
        });
}

module.exports = router;