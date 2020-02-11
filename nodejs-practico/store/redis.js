const redis = require('redis');
const { promisify } = require("util");

const config = require('../config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
});

const keyAsync = promisify(client.keys).bind(client);
const mgetAsync = promisify(client.mget).bind(client);

async function list(table) {
    const keys = await keyAsync(`${table}*`);
    let result = [];
    if(Array.isArray(keys) && keys.length > 0) {
        result = await mgetAsync(keys);
    }
    const resp = result.map(item => {
        return JSON.parse(item);
    });
    return resp;
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
    client.setex(key, 60, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
};