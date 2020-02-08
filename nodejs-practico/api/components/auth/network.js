const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');

const router = Router();

router.post('/login', login);


function login(req, res) {
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(error => {
            response.error(req, res, error, 400, 'Información invalida');
        })
}


module.exports = router;