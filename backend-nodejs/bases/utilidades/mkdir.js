const fs = require('fs')

// Crear carpetas
fs.mkdir('platzi/escuela-js/node', { recursive: true }, error => {
  if (error) {
    console.error(error)
  }
})