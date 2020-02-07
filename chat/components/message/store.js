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
async function getMessages(filterMessages) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterMessages !== null) {
            filter = {chat: filterMessages}
        }
        Model.find(filter)
            // Se debe indicar que campo debe popular
            .populate('user')
            // No se hace de forma automatica, se la debe ejecutar el populado
            .exec((error, populated) => {
                if(error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });
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