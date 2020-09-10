const fs = require('fs')

// Leer lo que le pasamos por el terminal
const file = process.argv[2];

if(!file) {
  throw new Error('Debes indicar el archivo que quieres leer')
}

const content = fs.readFile(file, function(error, content) {
  if(error) {
    console.error(error)
    return
  }
  const lines = content.toString().split('\n').length;
  console.log(lines)
})