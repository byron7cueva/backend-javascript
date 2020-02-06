const store = require('./store');

/**
 * Funcion para agregar los mensajes
 * @param {*} user 
 */
function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if(!user || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        }

        const fullMessage = {
            user,
            message,
            date: new Date()
        };
    
        store.add(fullMessage);
        resolve(fullMessage);
    })
}

/**
 * Funcion para obtener los mensajes
 */
function getMessages() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    });
}

module.exports = {
    addMessage,
    getMessages
}