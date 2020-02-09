const {Router} = require('express');
const response = require('../network/response');
const Store = require('../store/mysql');

const router = Router();

// Routes
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

// Function

async function list(req, res) {
    const data = await Store.list(req.params.table);
    response.success(req, res, data);
}

async function get(req, res) {
    const data = await Store.get(req.params.table, req.params.id);
    response.success(req, res, data);
}

async function insert(req, res) {
    const data = await Store.upsert(req.params.table, req.body);
    response.success(req, res, data, 201);
}

async function upsert(req, res) {
    const data = await Store.upsert(req,params.table, req.body);
    response.success(req, res, data, 201);
}

module.exports = router;