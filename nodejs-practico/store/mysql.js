const mysql = require('mysql');
const config = require('../config').mysql;

const connectionCofig = {
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password
};

let connection = null;

/**
 * Manejar la conexion
 */
function handleConnect() {
    connection = mysql.createConnection(connectionCofig);
    connection.connect(error => {
        if(error) {
            console.error('[error db]', error);
            setTimeout(handleConnect, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', (error) => {
        console.error('[error db]', error);
        if(error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnect();
        } else {
            throw error;
        }
    });
}

handleConnect();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, data) => {
            if(error) return reject(error);
            resolve(data);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (error, data) => {
            if(error) return reject(error);
            resolve(data);
        });
    });
}

function insert(table, data) {
    console.log('Llego al insert');
    return new Promise((resolve, reject) => {
        // El modulo mysql resuelve los campos a traves del objeto
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            console.log('Into insert');
            if(error) return reject(error);
            resolve(result);
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        // El modulo mysql resuelve los campos a traves del objeto
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
}

function upsert(table, data) {
    if(data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

function query(table, condition, join) {
    let joinQuery = '';
    if(join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    };

    console.log(joinQuery);

    return new Promise((resolve, reject) => {
        // El modulo mysql resuelve los campos a traves del objeto
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, condition, (error, result) => {
            if(error) return reject(error);
            resolve(result[0] || null);
        });
    });
}

module.exports = {
    list,
    get,
    upsert,
    query
}