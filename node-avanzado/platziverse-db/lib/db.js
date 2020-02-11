'use strict'

const Sequenlize = require('sequelize')
let sequelize = null

module.exports = function setupDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequenlize(config)
  }
  return sequelize
}
