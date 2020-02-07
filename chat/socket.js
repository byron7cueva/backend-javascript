const socketIo = require('socket.io');
const socket = {};

function connect(server) {
    socket.io = socketIo(server);

    socket.io.on('connection', (socketClient) => {
        console.log('Se ha conectado un nuevo cliente');
        socketClient.emit('message', 'Bienvenido');
    })
}

module.exports = {
    connect,
    socket
}
