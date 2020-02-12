module.exports = function setupAgent (AgentModel) {
  async function createOrUpdate (agent) {
    // Condicion
    const cond = {
      where: {
        uuid: agent.uuid
      }
    }

    // Retorna la primera ocurrencia que cumpla con la condicion
    const existAgent = await AgentModel.findOne(cond)

    if (existAgent) {
      // Actualizando el objeto que cumpla con la condicion
      // Esto devuelve el numero de filas que fueron actualizadas
      const updated = await AgentModel.update(agent, cond)
      // Si fue mas de una entonces devuelvo el objeto actualizado
      // Caso contrario devuelvo el mismo objeto
      // Esto quiere decir que no fue alterado
      return updated ? AgentModel.findOne(cond) : existAgent
    }

    // Creando el agente
    const result = await AgentModel.create(agent)
    // Sequelize devuelve un objeto complejo por ello devuelvo en json
    return result.toJSON()
  }

  function findById (id) {
    return AgentModel.findById(id)
  }

  function findByUuid (uuid) {
    return AgentModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return AgentModel.findAll()
  }

  function findConnected () {
    return AgentModel.findAll({
      where: {
        connected: true
      }
    })
  }

  function findByUsername (username) {
    return AgentModel.findAll({
      where: {
        username,
        connected: true
      }
    })
  }

  return {
    findById,
    createOrUpdate,
    findByUuid,
    findAll,
    findConnected,
    findByUsername
  }
}
