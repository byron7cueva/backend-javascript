'use strict'

const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')

const backend = {
  type: 'redis',
  redis,
  host: '192.168.1.10',
  // Para que redis retorne la informacion en buffers
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const server = new mosca.Server(settings)

// Cuando el servidor este listo
server.on('ready', () => {
  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`);
})

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
  debug(`Client Disconnected: ${client.id}`)
})

server.on('published', (packet, client) => {
  // Tipo de mensaje
  debug(`Received: ${packet.topic}`)
  // Que informacion nos ha llegado
  debug(`Payload: ${packet.payload}`)
})

// Manejando un error emitido por el servidor
server.on('error', handleFatalError)
function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

// Para cuando algun tipo de excepcion no fue manejada
// Esta ya pasa al nivel del proceso
process.on('uncaughtException', handleFatalError)

// Cuando no se maneja el rejection de alguna promesa
process.on('unhandleRejection', handleFatalError)