'use strict'

const debug = require('debug')('platziverse:api:routes')
const { Router } = require('express')

const api = Router()

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
