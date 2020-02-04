/**
 * Función que genera una excepción
 */
function serompe() {
  return 3 + z;
}

/**
 * Función que llama a la función que tiene una excepción
 * La excepción se propaga hacia arriba, hasta el nivel desde donde se ejecuto el código
 */
function otraFuncion() {
  serompe();
}

/**
 * Función asincrona que genera una excepción
 * @param {function} callback 
 */
function funcionAsincrona(callback) {
  setTimeout(() => {
    try {
      return 3 + z;
    } catch(error) {
      callback(error);
    }
  });
}

// Capturando la excepción
try {
  // serompe();
  // otraFuncion();
  funcionAsincrona(error => {
    console.log(error.message);
  });
} catch(error) {
  console.error('Ha pasado un error');
  console.error(error.message);
}

console.log('Esto de aqui esta en el final');