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
    
        console.log(fullMessage);
        resolve(fullMessage);
    })
}

module.exports = {
    addMessage
}