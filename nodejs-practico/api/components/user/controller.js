const auth = require('../auth');

const TABLA = 'user';

module.exports = class UserController {

    constructor(store) {
        this.store = store || require('../../../store/dummy');
    }

    list() {
        return this.store.list(TABLA);
    }

    get(id) {
        return this.store.get(TABLA, id);
    }

    async upsert({id = null, name = null, password = null, username = null}) {
        if(!name) {
            return Promise.reject('No se indico el nombre del usuario');
        }
        
        const user = {
            id: id,
            name,
            username
        };

        if(password || username) {
            await auth.upsert({
                id: user.id,
                username: username,
                password: password
            })
        }

        return this.store.upsert(TABLA, user);
    }

    remove(id) {
        if(!id) {
            return Promise.reject('No se indico el id del usuario');
        }

        return this.store.remove(TABLA, id);
    }

    follow(from, to) {
        const userFollow = {
            user_from: from,
            user_to: to
        };

        return this.store.upsert(`${TABLA}_follow`, userFollow);
    }

    async following(user) {
        const join = {};
        // Creando objeto para indicar la relación
        join[TABLA] = 'user_to'; //{user: 'user_to'}
        const query = {user_from: user};
        return await this.store.query(`${TABLA}_follow`, query, join);
    }
}
