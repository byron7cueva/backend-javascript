const statusMessage = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
};

/**
 * Respuestas exitosas
 */
exports.success = function(req, resp, data, status = 200) {
    const message = statusMessage[status];
    resp.status(status).send({
        error: '',
        body: data || message
    });
}

/**
 * Respuestas con error
 */
exports.error = function(req, resp, data, status = 500, details) {
    console.error(`[response error] ${details}`);
    const message = data || statusMessage[status];
    resp.status(status).send({
        error: message,
        body: ''
    });
}