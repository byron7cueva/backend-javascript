'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const chalk = require('chalk')

const port = process.env.PORT || 8080
const app = express()
// Utilizando como reqquest handler a app de express
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

// WebSockets

io.on('connect', socket => {
  debug(`Connected ${socket.id}`)
  socket.on('agent/message', payload => {
    console.log(payload)
  })

  setInterval(() => {
    socket.emit('agent/message', {agent: 'xxx-yyy'})
  }, 5000)
})

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)


server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-web]')} server listening on port ${port}`)
})
