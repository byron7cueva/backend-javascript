const store = require('./store');

/**
 * Creaa un usuario
 * @param {string} name 
 */
function addUser(name) {

    if(!name) {
        // Devolviendo una promesa rechasada
        return Promise.reject('Invalid name');
    }

    const user = {
        name
    };

    // Retornando la promesa del store
    return store.add(user);
}

/**
 * Obtener los usuarios
 */
function getUsers() {
    return store.list();
}

module.exports = {
    addUser,
    getUsers
}