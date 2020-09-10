const fs = require('fs')

// Leer que archivos tengo en un directorio
fs.readdir(__dirname, function(error, files) {
  if (error) {
    return console.error(error)
  }
  console.log(files)
})