// Configurar: node-gyp configure
// Construir: node-gyp build
// Aqui se lo importa como le hemos puesto el nombre en el archivo
// binding.gyp
const miAddon = require('./build/Release/addon');
console.log(miAddon.hola());