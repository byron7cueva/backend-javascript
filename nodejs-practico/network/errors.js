const response = require('./response');

function errors(error, req, res, next) {
    console.error('[error]', error);

    const message = error.message || 'Error interno';
    const status = error.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;