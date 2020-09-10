const fs = require('fs')
const http = require('http')

const server = http.createServer()

server.on('request', (req, res)  => {
  //Usando streams para leer el archivos grandes
  const src = fs.createReadStream('./big')
  //.pipe permite integrar un writable string y el res es un writable string
  src.pipe(res)
})

server.listen(3000)