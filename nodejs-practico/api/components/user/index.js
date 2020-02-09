const store = require('../../../store/remoteMysql');
const UserController = require('./controller');

module.exports = new UserController(store);
