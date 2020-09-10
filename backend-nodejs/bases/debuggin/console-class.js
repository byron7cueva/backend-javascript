const fs = require('fs')

const out = fs.createWriteStream('./out.log')
const err = fs.createWriteStream('./err.log')

// Creando una consola personalizada
//console.Console(salida de consola, errores)
const consoleFile = new console.Console(out, err);
setInterval(() => {
  consoleFile.log(new Date())
  consoleFile.error(new Error('Ooops!'))
}, 2000)