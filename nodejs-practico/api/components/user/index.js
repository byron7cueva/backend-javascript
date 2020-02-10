const UserController = require('./controller');
const config = require('../../../config');

let store;

if(config.remoteDB === true) {
    store = require('../../../store/remoteMysql');
} else {
    store = require('../../../store/mysql');
}

module.exports = new UserController(store);
