const request = require('request');

let urlRemote;

function req(method, table, data = null) {
    let url = `${urlRemote}/${table}`;
    let body = '';

    if(data && method === 'GET') {
        url += `/${id}`;
    } else if(data) {
        body = JSON.stringify(data);
    }
    
    return new Promise((resolve, reject) => {
        request({
            url,
            method,
            body,
            headers: {
                'content-type': 'application/json'
            }
        },(error, req, result) => {
            if(error) {
                console.error('Error en la base de datos', error);
                return reject(error.message);
            }

            const res = JSON.parse(result);
            return resolve(res.body);
        });
    });
}

function insert(table, data) {
    return req('POST', table, data);
}

function update(table, data) {
    return req('PUT', table, data);
}

module.exports = class RemoteStore {

    constructor(host, port) {
        urlRemote = `http://${host}:${port}`
    }

    list(table) {
        return req('GET', table);
    }

    get(table, id) {
        return req('GET', table, id);
    }

    upsert(table, data) {
        if(data.id) {
            return update(table, data);
        }
        return insert(table, data);
    }

    query(table, query, join) {
        return req('POST', `${table}/query`, {query, join});
    }
}