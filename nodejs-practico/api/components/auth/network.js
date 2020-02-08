const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./index');

const router = Router();

router.post('/login', login);


function login(req, res, next) {
    console.group('login');
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
            console.groupEnd('login');
        })
        .catch(next);
}


module.exports = router;