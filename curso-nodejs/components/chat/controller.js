const store = require('./store');

function addChat(users) {
    if(!users || !Array.isArray(users)) {
        return Promise.reject('Parametros invalidos');
    }

    const chat = {
        users: users
    };

    return store.add(chat);
}

function getChats(userId) {
    return store.list(userId);
}


module.exports = {
    getChats,
    addChat
}