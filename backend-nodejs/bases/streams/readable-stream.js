const { Readable } = require('stream')

const readableStream = new Readable();

readableStream.push(`${0/0}`.repeat(10).concat("Batman, Batman!"))
readableStream.push(null) // Indicar que dejo de recibir datos

// Funcionalidad de salida de datos en consola process.stdout
readableStream.pipe(process.stdout)