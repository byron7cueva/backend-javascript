const store = require('../../../store/mysql');
const UserController = require('./controller');

module.exports = new UserController(store);
