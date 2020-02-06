const list = [];

/**
 * Agregando mensajes
 * @param {} message 
 */
function addMessage(message) {
    list.push(message);
}

/**
 * Obtener los mensajes
 */
function getMessages() {
    return list;
}

module.exports = {
    add: addMessage,
    list: getMessages
}