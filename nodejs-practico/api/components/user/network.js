const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

function list(req, res, next) {
    Controller.list()
        .then(list => {
            response.success(req, res, list);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(user => {
            response.success(req, res, user);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user);
        })
        .catch(next);
}

function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, 'Se elimino correctamente');
        })
        .catch(next);
}

module.exports = router;