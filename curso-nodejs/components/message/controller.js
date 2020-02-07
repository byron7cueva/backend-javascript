const store = require('./store');
const {socket} = require('../../socket');
const config = require('../../config');

/**
 * Funcion para agregar los mensajes
 * @param {*} user 
 */
function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if(!chat || !user || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        }

        // Generando la url
        let fileUrl = '';
        if(file) {
            fileUrl = `${config.host}:${config.port}${config.publicRoute}${config.filesRoute}/${file.filename}`;
        }

        // Creando el objeto
        const fullMessage = {
            chat,
            user,
            message,
            date: new Date(),
            file: fileUrl
        };
    
        // Guardando
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    })
}

/**
 * Funcion para obtener los mensajes
 */
function getMessages(filterMessages) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterMessages));
    });
}

function updateMessage(id, message) {
    return new Promise(
        async (resolve, reject) => {
            if(!id || !message) {
                reject('Invalid data');
                return false;
            }
            const result = await store.updateText(id, message);
            resolve(result);
        }
    );
}

/**
 * Eliminar mensaje
 * @param {string} id 
 */
function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            reject('Id invaldo');
            return false;
        }
        store.remove(id)
        .then(() => {
            resolve();
        })
        .catch(e => {
            reject(e);
        })

    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}