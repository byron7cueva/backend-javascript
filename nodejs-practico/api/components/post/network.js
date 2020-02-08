const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');

const router = Router();

// Rutes
router.get('/', list);

// Functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;