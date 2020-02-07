const Model = require('./model');

/**
 * Agregando mensajes
 * @param {} message 
 */
function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

/**
 * Obtener los mensajes
 */
async function getMessages(filterUser) {
    let filter = {};
    if(filterUser !== null) {
        filter = {user: filterUser}
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    })

    foundMessage.message = message;
    const newMessage = await foundMessage.save();

    return newMessage;
}

/**
 * Eliminar mensaje
 * @param {string} id 
 */
function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage
}

//db_user_telegrom
//YOtdai78JKrftFCl
//mongo "mongodb+srv://cluster0-d4z3s.mongodb.net/test"  --username db_user_telegrom
//mongodb+srv://db_user_telegrom:<password>@cluster0-d4z3s.mongodb.net/test?retryWrites=true&w=majority