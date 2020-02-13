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

api.get('/agents', (req, res, next) => {
  debug('A request has come to /agents')
  res.send({})
})

api.get('/agent/:uuid', (req, res, next) => {
  const { uuid } = req.params
  res.send({ uuid })
})

api.get('/metrics/uuid', (req, res, next) => {
  const { uuid } = req.params
  res.send({ uuid })
})

api.get('/metrics/:uuid:type', (req, res, next) => {
  const { uuid, type } = req.params
  res.send({ uuid, type })
})

module.exports = api
