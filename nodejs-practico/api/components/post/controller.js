const TABLE = 'post';

module.exports = function(injectStore) {
    const store = injectStore || require('../../../store/dummy');

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    function upsert({id = null, user, text}) {
        const newPost = {
            id: id,
            user: user,
            text: text
        }
        return store.upsert(TABLE, newPost);
    }

    function getByUser(userId) {
        return store.query(TABLE, {
            user: userId
        });
    }

    return {
        list,
        get,
        upsert,
        getByUser
    }
}