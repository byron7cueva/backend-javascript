const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');

const routes = function(server) {
    // Cada ves que se llame a message se va ir al componente message
    // Añadiendo router
    server.use('/message', message);
    server.use('/user', user);
}

module.exports = routes;