const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.emit('message', 'Bienvenido');
});

setInterval(() => {
    io.emit('message', 'Hola desde el servidor')
}, 3000);

server.listen(3000, function() {
    console.log('Servidor escuchando desde el puerto 3000');
});
