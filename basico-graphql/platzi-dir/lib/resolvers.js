'use strict'

const queries = require('./queries')
const mutations = require('./mutations')
const types = require('./types')

// Configurando los resolvers
const resolvers = {
  Query: queries,
  Mutation: mutations, // Agregando las mutaciones
  ...types
}

module.exports = resolvers