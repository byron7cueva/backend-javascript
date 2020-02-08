const jwt = require('jsonwebtoken');

const config = require('../config');
const error = require('../utils/error');

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

        // Comprobar si es o no propio
        if(decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }
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
        throw error('No viene token', 401);
    }

    if(auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }

    let token = auth.replace('Bearer ','');
    return token;
}