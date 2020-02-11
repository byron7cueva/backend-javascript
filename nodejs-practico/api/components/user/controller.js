const auth = require('../auth');

const TABLA = 'user';

module.exports = class UserController {

    constructor(injectStore, injectCache) {
        this.store = injectStore || require('../../../store/dummy');
        this.cache = injectCache || require('../../../store/dummy');
    }

    async list() {
        let users = await this.cache.list(TABLA);

        if(!users) {
            console.log('No estaba en cache. Traendo de la Base de datos');
            users = await this.store.list(TABLA);
            await this.cache.upsert(TABLA, users);
        } else {
            console.log('Se obtienen los datos de cache');
        }
        return users;
    }

    async get(id) {
        let user = await this.cache.get(TABLA, id);

        if(!user) {
            console.log('No estaba en cache. Se busca en la base de datos');
            user = await this.store.get(TABLA, id);
            await this.cache.upsert(TABLA, user);
        } else {
            console.log('Se obtienen datos desde cache');
        }

        return user;
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
