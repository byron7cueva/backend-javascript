const store = require('../../../store/dummy');

const TABLA = 'user';

exports.list = function() {
    return store.list(TABLA);
}