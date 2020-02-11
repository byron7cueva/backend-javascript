const UserController = require('./controller');
const config = require('../../../config');

let store, cache;

if(config.remoteDB === true) {
    store = require('../../../store/remoteMysql');
    cache = require('../../../store/remoteRedis');
} else {
    store = require('../../../store/mysql');
    cache = require('../../../store/redis')
}

module.exports = new UserController(store, cache);
