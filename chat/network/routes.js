const express = require('express');
const message = require('../components/message/network');

const routes = function(server) {
    // Cada ves que se llame a message se va ir al componente message
    // Añadiendo router
    server.use('/message', message);
}

module.exports = routes;