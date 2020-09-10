const cluster = require('cluster')
const http = require('http')
const os = require('os')

// Cantidad de cpus que tiene la maquina
const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Si el cluster es maestro creamos tantos procesos como numero de CPUs
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  // Si por alguna razon el cluster finaliza realizamos un log
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // Lod diferentes workers pueden compartir la conexion TCP
  // En este caso es un servidor HTTP
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end('Hello world\n')
    })
    .listen(8000)

    console.log(`Worker ${process.pid} started`)
  }