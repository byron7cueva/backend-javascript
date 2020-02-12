'use strict'

module.exports = function setupMetric (MetricModel, AgentModel) {
  async function findByTypeAgentUuid (type, uuid) {
    return MetricModel.findAll({
      attributes: ['id', 'type', 'value', 'createdAt'],
      where: {
        type
      },
      limit: 20,
      order: [['createdAt', 'DESC']],
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: {
            uuid
          }
        }
      ],
      raw: true
    })
  }

  async function findByAgentUuid (uuid) {
    return MetricModel.findAll({
      // Select type
      attributes: ['type'],
      // group by
      group: ['type'],
      // join
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: { uuid }
        }
      ],
      raw: true
    })
  }

  async function create (uuid, metric) {
    // Primero buscamos el agente
    const agent = await AgentModel.findOne({
      where: { uuid }
    })

    // Validamos si ese agente existe para asignarle el id a la metrica
    if (agent) {
      Object.assign(metric, { agentId: agent.id })
      const result = await MetricModel.create(metric)
      return result.toJSON()
    }
  }

  return {
    create,
    findByAgentUuid,
    findByTypeAgentUuid
  }
}
