const fs = require('fs')

//Copiar archivos
fs.copyFile('naranja.txt', 'limon.txt', error => {
  if (error) {
    return console.error(error)
  }
  console.log('naranja se copio a limon')
})