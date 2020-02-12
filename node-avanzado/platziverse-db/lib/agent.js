module.exports = function setupAgent (AngentModel) {
  async function createOrUpdate (agent) {
    // Condicion
    const cond = {
      where: {
        uuid: agent.uuid
      }
    }

    // Retorna la primera ocurrencia que cumpla con la condicion
    const existAgent = await AngentModel.findOne(cond)

    if(existAgent) {
      // Actualizando el objeto que cumpla con la condicion
      // Esto devuelve el numero de filas que fueron actualizadas
      const updated = await AngentModel.update(agent, cond)
      // Si fue mas de una entonces devuelvo el objeto actualizado
      // Caso contrario devuelvo el mismo objeto
      // Esto quiere decir que no fue alterado
      return updated? await AngentModel.findOne(cond) : existAgent
    }

    // Creando el agente
    const result = await AngentModel.create(agent)
    // Sequelize devuelve un objeto complejo por ello devuelvo en json
    return result.toJSON();
  }

  function findById (id) {
    return AngentModel.findById(id)
  }

  return {
    findById,
    createOrUpdate
  }
}
