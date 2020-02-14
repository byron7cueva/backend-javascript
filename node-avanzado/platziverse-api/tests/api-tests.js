'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const {agentFixtures, metricFixtures} = require('platziverse-test-util/fixtures')
const {bodyError} = require('platziverse-test-util/util')
const auth = require('../auth')
const {promisify} = require('util')
const config = require('../config')

const sign = promisify(auth.sign)

let sanbox = null, server = null, dbStub = null, AgentStub = {}, MetricStub = {}
let token = null
const uuidExistArgs = 'yyy-yyy-yyy'
const uuidNoExistArgs = 'xxx'
const uuidThrowArgs = 1
const type = 'ram'
const errorAgentNotFound = bodyError`Agent not found with uuid ${0}`
const errorMetricsNotFound = bodyError`Metrics not found for agent with uuid ${0}`
const errorMetricsTypeNotFound = bodyError`Metrics (${0}) not found for agent with uuid ${1}`

test.beforeEach(async () => {
  sanbox = sinon.createSandbox()

  dbStub = sanbox.stub()
  dbStub.returns(Promise.resolve({
    Agent: AgentStub,
    Metric: MetricStub
  }))

  AgentStub.findConnected = sanbox.stub()
  AgentStub.findConnected.returns(Promise.resolve(agentFixtures.connected))

  AgentStub.findByUuid = sanbox.stub()
  AgentStub.findByUuid.withArgs(uuidExistArgs).returns(Promise.resolve(agentFixtures.byUuid(uuidExistArgs)))
  AgentStub.findByUuid.withArgs(uuidNoExistArgs).returns(Promise.resolve(null))

  MetricStub.findByAgentUuid = sanbox.stub()
  MetricStub.findByAgentUuid.withArgs(uuidExistArgs).returns(Promise.resolve(metricFixtures.findByAgentUuid(uuidExistArgs)))
  MetricStub.findByAgentUuid.withArgs(uuidNoExistArgs).returns(Promise.resolve(null))

  MetricStub.findByTypeAgentUuid = sanbox.stub()
  MetricStub.findByTypeAgentUuid.withArgs(type, uuidExistArgs).returns(Promise.resolve(metricFixtures.findByTypeAgentUuid(type, uuidExistArgs)))
  MetricStub.findByTypeAgentUuid.withArgs(type, uuidNoExistArgs).returns(Promise.resolve(null))

  token = await sign({admin: true, username: 'platzi'}, config.auth.secret)

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
    // Asignando la cabecera de autorizacion
    .set('Authorization', `Bearer ${token}`)
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

test.serial.cb('/api/agent/:uuid', t => {
  request(server)
  .get(`/api/agent/${uuidExistArgs}`)
  .expect(200)
  .expect('Content-Type', /json/)
  .end((error, res) => {
    t.falsy(error, 'should not return an error')
    const body = JSON.stringify(res.body)
    const expected = JSON.stringify(agentFixtures.byUuid(uuidExistArgs))
    t.deepEqual(body, expected, 'response body should be the expected')
    t.end()
  })
})

test.serial.cb('/api/agent/:uuid - not found', t => {
  request(server)
  .get(`/api/agent/${uuidNoExistArgs}`)
  .expect(404)
  .expect('Content-Type', /json/)
  .end((error, res) => {
    t.falsy(error, 'should not return an error')
    const body = JSON.stringify(res.body)
    const expected = JSON.stringify(errorAgentNotFound(uuidNoExistArgs))
    t.deepEqual(body, expected, 'response body should be the expected')
    t.end()
  })
})

test.serial.cb('/api/metrics/:uuid', t => {
  request(server)
  .get(`/api/metrics/${uuidExistArgs}`)
  .expect(200)
  .expect('Content-Type', /json/)
  .end((error, res) => {
    t.falsy(error, 'should not return an error')
    const body = JSON.stringify(res.body)
    const expected = JSON.stringify(metricFixtures.findByAgentUuid(uuidExistArgs))
    t.deepEqual(body, expected, 'response body should be the expected')
    t.end()
  })
})

test.serial.cb('/api/metrics/:uuid - not found', t => {
  request(server)
  .get(`/api/metrics/${uuidNoExistArgs}`)
  .expect(404)
  .expect('Content-Type', /json/)
  .end((error, res) => {
    t.falsy(error, 'should not return an error')
    const body = JSON.stringify(res.body)
    const expected = JSON.stringify(errorMetricsNotFound(uuidNoExistArgs))
    t.deepEqual(body, expected, 'response body should be the expected')
    t.end()
  })
})

test.serial.cb('/api/metrics/:uuid/:type', t => {
  request(server)
  .get(`/api/metrics/${uuidExistArgs}/${type}`)
  .expect(200)
  .expect('Content-Type', /json/)
  .end((error, res) => {
    t.falsy(error, 'should not return an error')
    const body = JSON.stringify(res.body)
    const expected = JSON.stringify(metricFixtures.findByTypeAgentUuid(type, uuidExistArgs))
    t.deepEqual(body, expected, 'response body should be the expected')
    t.end()
  })
})

test.serial.cb('/api/metrics/:uuid/:type - not found', t => {
  request(server)
  .get(`/api/metrics/${uuidNoExistArgs}/${type}`)
  .expect(404)
  .expect('Content-Type', /json/)
  .end((error, res) => {
    t.falsy(error, 'should not return an error')
    const body = JSON.stringify(res.body)
    const expected = JSON.stringify(errorMetricsTypeNotFound(type, uuidNoExistArgs))
    t.deepEqual(body, expected, 'response body should be the expected')
    t.end()
  })
})