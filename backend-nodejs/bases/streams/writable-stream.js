const { Writable } = require('stream')

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})

//Tienen que estar añadidos a un writable string
// Funcion nativa que se encarga de leer los datos
process.stdin.pipe(writableStream)