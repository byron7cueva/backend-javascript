const Model = require('./model');

/**
 * Agrega un chat
 * @param {*} users 
 */
function addChat(users) {
    const myChat = new Model(users);
    return myChat.save();
}

/**
 * Devuelve los chats
 * @param {*} userId 
 */
function getChats(userId) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(userId !== null) {
            filter = {
                users: userId
            }
        }

        Model.find(filter)
            .populate('users')
            .exec((error, populated) => {
                if(error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });
}

module.exports = {
    add: addChat,
    list: getChats
}