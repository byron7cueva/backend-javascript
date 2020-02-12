'use strict'
const defaults = require('defaults')

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')
const setupAgent = require('./lib/agent')

module.exports = async function (config) {
  // Si no tiene valores tome los siguintes por defecto
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      // Tiempo de vida si la conexion no es utilizada
      idle: 10000
    },
    query: {
      // Que me entrege objetos JSON sencillos sequelize
      // Sequelize entrega objetos complejos por defecto
      raw: true
    }
  })

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

  const Agent = setupAgent(AgentModel)
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
