'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const chalk = require('chalk')
const PlatziverseAgent = require('platziverse-agent')
const { pipe } = require('./utils')
const proxy = require('./proxy')
const asyncify = require('express-asyncify')

const port = process.env.PORT || 8080
const app = asyncify(express())
// Utilizando como reqquest handler a app de express
const server = http.createServer(app)
const io = socketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

// WebSockets

io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)
})

// Express Error Handler
app.use((error, req, res, next) => {
  debug(`Error: ${error.message}`)
  if (error.message.match(/not found/)) {
    return res.status(404).send({ error: error.message })
  }

  res.status(500).send({ error: error.message })
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
  agent.connect()
})
