const {Router} = require('express');
const response = require('../../../network/response');
const Controller = require('./controller');

const router = Router();

router.get('/', (req, res) => {
    const list = Controller.list();
    response.success(req, res, list);
});

module.exports = router;