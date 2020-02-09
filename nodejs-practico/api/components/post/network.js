const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = Router();

// Rutes
router.get('/', list);
router.get('/:id', get);
router.get('/user/:userId', getByUser)
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(next)
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function getByUser(req, res, next) {
    Controller.getByUser(req.params.userId)
        .then(data => {
            response.success(req, res, data);
        })
        .catch(next);
}

module.exports = router;