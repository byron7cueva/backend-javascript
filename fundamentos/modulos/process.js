// No hace falta importarlo porque ya viene en el mòdulo global
//const process = require('process');

/**
 * Antes que se desconecten todos los bindings y modulos
 */
process.on('beforeExit', () => {
  console.log('El proceso va terminar');
});

// Esto se ejecuta cuando ya se ha desconectado del event loop
process.on('exit', () => {
  console.log('El proceso termino');
  setTimeout(() => {
    console.log('Esto nunca se va ejecutar');
  }, 0);
});

// Cuando una excepcion se produjo y nadie lo capturo
process.on('uncaughtException', (error, origen) => {
  console.log('Vamos a capturar un error');
  console.error(error);
});

//funcionNoExiste();

console.log('Si el error no se recoje no sale');

// Para promesas que se han rechado y nadie tiene un catch
// process.on('uncaughtRejection');