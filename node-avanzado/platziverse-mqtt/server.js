'use strict'

const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')
const { parsePayload } = require('./utils')

const backend = {
  type: 'redis',
  redis,
  host: '192.168.1.2',
  // Para que redis retorne la informacion en buffers
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const config = {
  database: process.env.DB_NAME || 'platziverse',
  username: process.env.DB_USER || 'desarrollo',
  password: process.env.DB_PASS || 'desarrollo',
  host: process.env.Db_HOST || '192.168.1.2',
  dialect: 'postgres',
  logging: message => debug(message)
}

const server = new mosca.Server(settings)
const clients = new Map()
let Agent, Metric

// Cuando el servidor este listo
server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)

  Agent = services.Agent
  Metric = services.Metric

  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
})

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
  // Guardando el cliente
  clients.set(client.id, null)
})

server.on('clientDisconnected', async client => {
  debug(`Client Disconnected: ${client.id}`)
  const agent = clients.get(client.id)
  if (agent) {
    agent.connected = false

    try {
      await Agent.createOrUpdate(agent)
    } catch (error) {
      handleError(error)
    }

    // Delete agent from list clients
    clients.delete(client.id)

    // Notificando que se desconecto
    server.publish({
      topic: 'agent/disconnected',
      payload: JSON.stringify({
        agent: {
          uuid: agent.uuid
        }
      })
    })
    debug(`Client (${client.id}) associeted to Agent (${client.id}) marked disconnected`)
  }
})

server.on('published', async (packet, client) => {
  // Tipo de mensaje
  debug(`Received: ${packet.topic}`)
  switch (packet.topic) {
    case 'agent/connected':
    case 'agent/disconnected':
      // Que informacion nos ha llegado
      debug(`Payload: ${packet.payload}`)
      break
    case 'agent/message': {
      debug(`Payload: ${packet.payload}`)
      const payload = parsePayload(packet.payload)

      if (payload) {
        payload.agent.connected = true
        let agent
        try {
          agent = await Agent.createOrUpdate(payload.agent)
        } catch (error) {
          return handleError(error)
        }

        debug(`Agent ${agent.uuid} saved`)

        // Notificar al agente
        if (!clients.get(client.id)) {
          clients.set(client.id, agent)
          server.publish({
            topic: 'agent/connected',
            // El payload tiene que ser en string
            payload: JSON.stringify({
              agent: {
                uuid: agent.uuid,
                name: agent.name,
                hostname: agent.hostname,
                pid: agent.pid,
                connected: agent.connected
              }
            })
          })
        }

        // Store
        const saveMetricPromise = []
        for (const metric of payload.metrics) {
          saveMetricPromise.push(
            new Promise((resolve, reject) => {
              Metric.create(agent.uuid, metric)
              .then(m => {
                debug(`Metric ${m.id} saved on agent ${agent.uuid}`)
                resolve(m)
              })
              .catch(reject)
            })
          )
        }
        await Promise.all(saveMetricPromise)
        debug('Termino de almacenar todas las metrica')
      }
      break
    }
  }
})

function handleError (error) {
  console.error(`${chalk.red('[error]')} ${error.message}`)
  console.error(error.stack)
}

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
