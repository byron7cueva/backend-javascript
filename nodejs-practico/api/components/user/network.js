const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = Router();

// Routes
router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
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

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201)
        })
        .catch(next);
}

function following(req, res, next) {
    Controller.following(req.params.id)
        .then(data => {
            return response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;