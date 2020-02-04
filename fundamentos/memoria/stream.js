const fs = require('fs');
const stream = require('stream');
const util = require('util');

let data = '';

let readableStream = fs.createReadStream(`${__dirname}/input.txt`);
readableStream.setEncoding('UTF8');
/*readableStream.on('data', (chunk) => {
  // El stream va venir en una codificación concreta
  // Poniendole el encoding ya no es necesario ponerle toString(),
  // para obtener el contenido
  //console.log(chunk);
  //console.log(chunk.toString());
  data += chunk;
});

readableStream.on('end', () => {
  console.log(data);
});*/

// Bufer de escritura
/*process.stdout.write('Hola');
process.stdout.write('que');
process.stdout.write('Hola');*/

const Transform = stream.Transform;

/**
 * Contructor
 */
function Mayus() {
  Transform.call(this);
}

// Herencia
util.inherits(Mayus, Transform);

Mayus.prototype._transform = function(chunk, codif, cb) {
  let chunkMayus = chunk.toString().toUpperCase();
  this.push(chunkMayus);
  cb();
}

let mayus = new Mayus();
readableStream
  .pipe(mayus)
  .pipe(process.stdout);
