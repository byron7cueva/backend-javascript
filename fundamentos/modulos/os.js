const os = require('os');

// Obteniendo la arquitectura del sistema operativo
console.log(os.arch());

// Ver la plataforma
console.log(os.platform());

// Información de la cpu
console.log(os.cpus().length);

// Todos los errores y señales del sistema
// Ver las constantes
console.log(os.constants);

// Memoria libre
console.log(os.freemem());

const SIZE = 1024;
function kb(bytes) { return bytes / SIZE;}
function mb(bytes) { return kb(bytes) / SIZE;}
function gb(bytes) { return mb(bytes) / SIZE;}

console.log(kb(os.freemem()));
console.log(mb(os.freemem()));
console.log(gb(os.totalmem()));
console.log(gb(os.freemem()));
console.log(gb(os.totalmem()) - gb(os.freemem()));

// Directorio personal
console.log(os.homedir());

// Directorio donde se guardan los archivos temporales
console.log(os.tmpdir());

// Obteniendo el nombre del host
console.log(os.hostname());

// Obteniendo las interfaces de red
console.log(os.networkInterfaces());
