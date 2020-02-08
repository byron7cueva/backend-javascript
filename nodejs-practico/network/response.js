/**
 * Respuesta existosa
 */
exports.success = function(req, res, data, status = 200) {
    res.status(status).send({
        error: false,
        body: data,
        status: status
    });
}

/**
 * Respuesta con error
 */
exports.error = function(req, res, data = 'Internal error', status = 500) {
    res.status(status).send({
        error: data,
        body: null,
        status: status
    });
}