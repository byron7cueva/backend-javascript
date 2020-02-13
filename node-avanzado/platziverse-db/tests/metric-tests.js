'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const metricFixtures = require('./fixtures/metric')
const agentFixtures = require('./fixtures/agent')
const { extend } = require('./util')

const config = {
  logging: () => {}
}

const newMetric = {
  type: 'cpu',
  value: '50%'
}

let db = null; const type = 'cpu'; const uuid = 'yyy-yyy-yyy'

let AgentStub, MetricStub, sanbox, byTypeAndUuidArgs, byUuidArgs

const findOneArgs = {
  where: { uuid }
}

test.beforeEach(async () => {
  sanbox = sinon.createSandbox()
  AgentStub = {
    hasMany: sanbox.spy(),
    findOne: sanbox.stub()
  }

  MetricStub = {
    belongsTo: sanbox.spy(),
    findAll: sanbox.stub(),
    create: sanbox.stub()
  }

  const baseArgs = {
    include: [
      {
        attributes: [],
        model: AgentStub,
        where: { uuid }
      }
    ],
    raw: true
  }

  byTypeAndUuidArgs = extend(baseArgs, {
    attributes: ['id', 'type', 'value', 'createdAt'],
    where: {
      type
    },
    limit: 20,
    order: [['createdAt', 'DESC']]
  })

  byUuidArgs = extend(baseArgs, {
    attributes: ['type'],
    group: ['type']
  })

  MetricStub.findAll.withArgs(byTypeAndUuidArgs).returns(Promise.resolve(metricFixtures.findByTypeAgentUuid(type, uuid)))
  MetricStub.findAll.withArgs(byUuidArgs).returns(Promise.resolve(metricFixtures.findByAgentUuid(uuid)))
  
  AgentStub.findOne.withArgs(findOneArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))
  MetricStub.create.withArgs(newMetric).returns(Promise.resolve({
    toJSON () { return newMetric }
  }))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sanbox && sanbox.restore()
})

test('Metric', t => {
  t.truthy(db.Metric, 'Metric should exist')
})

test.serial('Metric#findByTypeAgentUuid', async t => {
  const metrics = await db.Metric.findByTypeAgentUuid(type, uuid)

  t.true(MetricStub.findAll.called, 'findAll should be called on MetricModel')
  t.true(MetricStub.findAll.calledOnce, 'findAll should be called once')
  t.true(MetricStub.findAll.calledWith(byTypeAndUuidArgs), 'findAll should be called with const byTypeAndUuidArgs')

  const metricsCompare = metricFixtures.findByTypeAgentUuid(type, uuid)
  t.is(metrics.length, metricsCompare.length, 'metrics length should be same metricsCompare.length')
  t.deepEqual(metrics, metricsCompare, 'metrics should be same metricsCompare')
})

test.serial('Metric#findByAgentUuid', async t => {
  const metrics = await db.Metric.findByAgentUuid(uuid)

  const metricsCompare = metricFixtures.findByAgentUuid(uuid)
  t.is(metrics.length, metricsCompare.length, 'metrics length should be same metricsCompare.length')
  t.deepEqual(metrics, metricsCompare, 'metrics should be same metricsCompare')
})

test.serial('Metric#create', async t => {
  const metric = await db.Metric.create(uuid, newMetric)

  t.true(AgentStub.findOne.called, 'findOne should be called on AgentModel')
  t.true(AgentStub.findOne.calledOnce, 'findOne should be called once')
  t.true(AgentStub.findOne.calledWith(findOneArgs), 'findOne should called with findOneArgs')

  t.true(MetricStub.create.called, 'create should be called on MetricModel')
  t.true(MetricStub.create.calledOnce, 'create should be called once')
  t.true(MetricStub.create.calledWith(newMetric), 'create should be called with newMetric argument')

  t.deepEqual(metric, newMetric, 'metric should be same newMetric')
})
