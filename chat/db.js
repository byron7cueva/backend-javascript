const db = require('mongoose');

db.Promise = global.Promise;

//'mongodb+srv://db_user_telegrom:YOtdai78JKrftFCl@cluster0-d4z3s.mongodb.net/test?retryWrites=true&w=majority'
async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    console.log('[db] Conectada con exito');
}

module.exports = connect;