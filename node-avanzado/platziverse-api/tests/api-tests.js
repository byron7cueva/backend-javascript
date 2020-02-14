'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const {agentFixtures} = require('platziverse-test-util/fixtures')

let sanbox = null
let server = null
let dbStub = null, AgentStub = {}, MetricStub = {}

test.beforeEach(async () => {
  sanbox = sinon.createSandbox()

  dbStub = sanbox.stub()
  dbStub.returns(Promise.resolve({
    Agent: AgentStub,
    Metric: MetricStub
  }))

  // Sobreescribiendo las dependencias
  const api = proxyquire('../api', {
    'platziverse-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })
})

test.afterEach(() => {
  sanbox && sanbox.restore()
})

// Para probar funciones de tipo callback
test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(agentFixtures.connected)
      t.deepEqual(body, expected, 'response body shuld be the expected')
      // t.end() Es necesario cuando el test de tipo test.serial.cb indicando que termino
      t.end()
    })
})
