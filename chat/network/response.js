/**
 * Respuestas exitosas
 */
exports.success = function(req, resp, message, status) {
    resp.status(status || 200).send({
        error: '',
        body: message
    });
}

/**
 * Respuestas con error
 */
exports.error = function(req, resp, message, status, details) {
    console.error(`[response error] ${details}`);

    resp.status(status || 500).send({
        error: message,
        body: ''
    });
}