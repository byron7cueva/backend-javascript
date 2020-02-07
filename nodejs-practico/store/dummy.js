const db = {
    'user': [
        {id: 1, name: 'Byron'}
    ]
};

exports.list = function(tabla) {
    return db[tabla];
}

exports.get = function(tabla, id) {
    return db[tabla].filter(item => item.id === id)[0] || null;
}

exports.upsert = function(tabla, data) {
    db[tabla].push(data);
}

exports.remove = function(tabla, id) {
    const index = db[tabla].findIndex(item => item.id === id);
    db[tabla].splice(index,1);
}