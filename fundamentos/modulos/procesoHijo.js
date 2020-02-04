const {exec, spawn} = require('child_process');

/**
 * Permite ejecutar comandos en el terminal
 * exec(comando, callback(error, salida_estandas, error_estandar))
 */
/*exec('node consola.js', (error, stdout, sterr) => {
  if(error) {
    console.error(error);
    return false;
  }
  console.log(stdout);
});*/

/**
 * Permite ejecutar un proceso y ver como va su ejecución
 */
let proceso = spawn('ls', ['-la']);
console.log(proceso.pid);
console.log(proceso.connected);

/**
 * Escuchando un evento cuando se obtiene salida
 */
proceso.stdout.on('data', dato => {
  console.log(`Esta muerto? ${proceso.killed}`);
  console.log(dato.toString());
});

/**
 * Escuchando cuando el proceso ha terminado
 */
proceso.on('exit', () => {
  console.log('El proceso termino');
  console.log(proceso.killed);
});