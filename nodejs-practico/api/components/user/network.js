const {Router} = require('express');
const response = require('../../../network/response');

const router = Router();

router.get('/', (req, res) => {
    response.success(req, res, 'Todo funcionando correctamente');
});

module.exports = router;