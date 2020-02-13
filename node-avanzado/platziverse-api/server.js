const http = require('http')
const express = require('express')
const chalk = require('chalk')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

// Middlewares
// Son funciones que se ejecutan antes de que la peticion llege a la ruta final
app.use('/api', api)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
})
