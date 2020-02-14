'use strict'

const {Router} = require('express')
const asyncify = require('express-asyncify')
const request = require('request-promise-native')
const {endpoint, apiToken} = require('./config')

const api = asyncify(Router())

api.get('/agents', async (req, res, next) => {
  const options = {
    method: 'GET',
    utl: `${endpoint}/api/agents`,
    headers: {
      'Autorization': 'Bearer ${apiToken}'
    },
    json: true
  }

  let result
  try {
    result = await request(options)
  } catch(error) {
    return next(error)
  }

  res.send(result)
})

api.get('/agent/:uuid', (req, res) => {})

api.get('/mertics/:uuid', (req, res) => {})

api.get('/metrics/:uuid/:type', (req, res) => {})

module.exports = api