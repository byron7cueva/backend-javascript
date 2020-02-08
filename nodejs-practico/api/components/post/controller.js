const TABLE = 'post';

module.exports = function(injectStore) {
    const store = injectStore || require('../../../store/dummy');

    function list() {
        return store.list(TABLE);
    }

    return {
        list
    }
}