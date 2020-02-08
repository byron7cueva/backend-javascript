const jwt = require('jsonwebtoken');

const config = require('../config');

const secrect = config.jwt.secrect;

exports.sign  = function(data) {
    return jwt.sign(data, secrect);
}

function verify(token) {
    return jwt.verify(token, secrect);
}

exports.check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
    },
};

/**
 * Decodificar token
 */
function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

function getToken(auth) {
    if(!auth) {
        throw new Error('No viene token');
    }

    if(auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ','');
    return token;
}