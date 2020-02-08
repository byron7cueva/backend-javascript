const auth = require('../../../auth');

const TABLA = 'auth';

module.exports = function (injectStore) {
    const store = injectStore || require('../../../store/dummy');

    function upsert(data) {
        const authData = {
            id: data.id
        }

        if(data.username) {
            authData.username = data.username
        }

        if(data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLA, authData);
    }

    async function login(username, password) {
        const data = await store.query(TABLA, {
            username: username
        });

        if(data.password === password) {
            // Generar token
            return auth.sign(data);
        } else {
            throw new Error('Información invalida')
        }
    }

    return {
        upsert,
        login
    }
}