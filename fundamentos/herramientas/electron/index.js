const {app, BrowserWindow} = require('electron');

var ventanaPrincipal;

function crearVentana() {
    ventanaPrincipal = new BrowserWindow({
        width:800,
        height: 600
    });

    ventanaPrincipal.loadFile('index.html');
}

app.on('ready', () => {
    crearVentana();
});