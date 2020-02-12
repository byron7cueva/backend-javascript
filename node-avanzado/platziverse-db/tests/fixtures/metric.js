'use strict'

const { extend, selectAttributes } = require('../util')
const agent = require('./agent')

const metric = {
  id: 1,
  type: 'cpu',
  value: '50%',
  agentId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}

const metrics = [
  metric,
  extend(metric, { id: 2, agentId: 1, type: 'ram', value: '20GB' }),
  extend(metric, { id: 3, agentId: 2 }),
  extend(metric, { id: 4, agentId: 2, type: 'ram', value: '2GB' }),
  extend(metric, { id: 5, agentId: 2, type: 'disk' })
]

function findByAgentUuid (uuid) {
  const agentFinded = agent.byUuid(uuid)
  const metricsResult = metrics.filter(item => item.agentId === agentFinded.id)
  return selectAttributes(metricsResult, ['type'])
}

function findByTypeAgentUuid (type, uuid) {
  const agentFinded = agent.byUuid(uuid)
  const metricsResult = metrics.filter(item => item.agentId === agentFinded.id && item.type === type)
  return selectAttributes(metricsResult, ['id', 'type', 'value', 'createdAt'])
}

module.exports = {
  single: metric,
  findByAgentUuid,
  findByTypeAgentUuid
}
