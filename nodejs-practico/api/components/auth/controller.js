const bcrypt = require('bcrypt');

const auth = require('../../../auth');

const TABLA = 'auth';

module.exports = function (injectStore) {
    const store = injectStore || require('../../../store/dummy');

    async function upsert(data) {
        const authData = {
            id: data.id
        }

        if(data.username) {
            authData.username = data.username
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 5); // Hay que indicar el numero de veces que queremos que se ejecute el algoritmo
        }

        return store.upsert(TABLA, authData);
    }

    async function login(username, password) {
        let data = await store.query(TABLA, {
            username: username
        });

        data = JSON.parse(JSON.stringify(data));

        return bcrypt.compare(password, data.password)
        .then(sonIguales => {
            if(sonIguales === true) {
                // Generar token
                return auth.sign(data);
            } else {
                throw new Error('Información invalida')
            }
        });
    }

    return {
        upsert,
        login
    }
}