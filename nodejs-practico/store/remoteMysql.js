const RemoteStore = require('./remote');
const config = require('../config');

module.exports = new RemoteStore(config.mysqlService.host, config.mysqlService.port);