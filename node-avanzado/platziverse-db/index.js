'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  // Relaciones
  // Agente tiene muchas metrias
  AgentModel.hasMany(MetricModel)
  // Una metrica pertenece a un Agente
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()
  // Si no hay las relaciones en la base de datos se crea por sequelize
  // Tambien crea el id de las tablas y les asigna como clave primaria
  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
