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
exports.error = function(req, res, detail, status = 500, data = 'Internal error') {
    console.error(detail);
    res.status(status).send({
        error: false,
        body: data,
        status: status
    });
}