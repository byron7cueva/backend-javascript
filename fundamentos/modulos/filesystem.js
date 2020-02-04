const fs = require('fs');

/**
 * 
 * @param {Funcion para leer un archivo} ruta 
 * @param {*} cb 
 */
function leer(ruta, cb) {
  fs.readFile(ruta, (err, data) => {
    cb(data.toString());
  })
}

function escribir(ruta, contenido, cb) {
  fs.writeFile(ruta, contenido, (error) => {
    if(error) {
      console.error('Ha ocurrido un error al escribir');
    } else {
      console.log('Se escribio correctamente');
    }
  });
}

function borrar (ruta, cb) {
  fs.unlink(ruta, cb);
}

leer(`${__dirname}/archivo.txt`, console.log)
//escribir(`${__dirname}/archivo_nuevo.txt`, 'Soy un archivo nuevo', console.log)
//borrar(`${__dirname}/archivo_nuevo.txt`, console.log);