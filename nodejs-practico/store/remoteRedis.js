const RemoteStore = require('./remote');
const config = require('../config');

module.exports = new RemoteStore(config.cacheService.host, config.cacheService.port);