const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;
db.connect('mongodb+srv://db_user_telegrom:YOtdai78JKrftFCl@cluster0-d4z3s.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
console.log('[db] Conectada con exito');

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

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText
}

//db_user_telegrom
//YOtdai78JKrftFCl
//mongo "mongodb+srv://cluster0-d4z3s.mongodb.net/test"  --username db_user_telegrom
//mongodb+srv://db_user_telegrom:<password>@cluster0-d4z3s.mongodb.net/test?retryWrites=true&w=majority