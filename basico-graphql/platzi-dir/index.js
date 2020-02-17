'use strict'

require('dotenv').config() // Esto carga el archivo .env y va caragarlo como variables de entorno
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.PORT || 3000

// Definiendo el esquema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), { encoding: 'utf8'})
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', gqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server is listen at http://localhost:${port}`)
})
