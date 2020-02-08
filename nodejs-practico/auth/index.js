const jwt = require('jsonwebtoken');

exports.sign  = function(data) {
    return jwt.sign(data, 'secreto');
}