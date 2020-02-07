const Model = require('./model');

/**
 * Agregar un usuario
 * @param {*} user 
 */
function addUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}

/**
 * Obtener los usuarios
 */
function getUsers() {
    return Model.find();
}

module.exports = {
    add: addUser,
    list: getUsers
}