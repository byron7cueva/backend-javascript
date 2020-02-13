'use strict'

const debug = require('debug')('platziverse:api:routes')
const { Router } = require('express')
const db = require('platziverse-db')
const asyncify = require('express-asyncify')
const config = require('./config')

// Dando soporte de async/await a las rutas
const api = asyncify(Router())

let services, Agent, Metric

// Middleware de interseccion
api.use('*', async (req, res, next) => {
  // La connecion a la base de datos se realiza una sola vez
  if (!services) {
    debug(`Connecting to database`)
    try {
      services = await db(config.db)
    } catch (error) {
      next(error)
    }
    Agent = services.Agent
    Metric = services.Metric
  }
  // Necesito llamar a next() para que siga con la ruta
  next()
})

/**
 * Devuelve la lista de agentes
 */
api.get('/agents', async (req, res, next) => {
  debug('A request has come to /agents')

  let agents = []
  try {
    agents = await Agent.findConnected()
  } catch(error) {
    return next(error)
  }

  res.send(agents)
})

/**
 * Devuelve un agente a partir de su uuid
 */
api.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /agent/${uuid}`)
  let agent
  try {
    agent = await Agent.findByUuid(uuid)
  } catch(error) {
    return next(error)
  }

  if(!agent) {
    return next(new Error(`Agent not found with uuid ${uuid}`))
  }

  res.send(agent)
})

/**
 * Devuelve las metricas de un agente
 */
api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /metrics/${uuid}`)
  let metrics = []
  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch(error) {
    return next(error)
  }

  if(!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid ${uuid}`))
  }

  res.send(metrics)
})

/**
 * Devuelve los ultimos 20 valores almacenados de metricas de un agente y por tipo
 * de metrica
 */
api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params

  debug(`request to /metrics/${uuid}/${type}`)
  let metrics = []
  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (error) {
    return next(error)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid ${uuid} and type ${type}`))
  }

  res.send(metrics)
})

module.exports = api
