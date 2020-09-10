const http = require('http')

const server = http.createServer()
server.on('request', (req, res) => {
  // req es un RedableString el cual contiene eventos
  if (req.method === 'POST' && req.url === '/echo') {
    let body = []
    // Los string reciben pequeños pedasos de datos (chunks) cuando son una gran cantidad de datos
    req.on('data', chunk => {
      body.push(chunk)
    })
    .on('end', () => {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      //Los datos son de tipo bufer por lo cual se debe transformar a string
      body = Buffer.concat(body).toString()
      res.end(body)
    })
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(8001)
console.log('Server on 8001')