const redis = require('redis');
const config = require('../config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
});

function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (error, result) => {
            if(error) return Promise.reject(error);
            const resp = JSON.parse(result);
            resolve(resp);
        })
    }); 
}

function get(table, id) {
    const key = `${table}_${id}`;
    return list(key);
}

async function upsert(table, data) {
    let key = table;
    if(data && data.id) {
        key += `_${data.id}`;
    }
    client.setex(key, 10, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
};