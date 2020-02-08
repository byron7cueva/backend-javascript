const store = require('../../../store/dummy');
const UserController = require('./controller');

module.exports = new UserController(store);
