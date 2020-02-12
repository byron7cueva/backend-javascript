'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const config = {
  logging: () => {}
}
let db = null

let AgentStub, MetricStub, sanbox

test.beforeEach(async () => {
  sanbox = sinon.createSandbox()
  AgentStub = {
    hasMany: sanbox.spy()
  }

  MetricStub = {
    belongsTo: sanbox.spy()
  }

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test('Metric', t => {
  t.truthy(db.Metric, 'Metric should exist')
})
