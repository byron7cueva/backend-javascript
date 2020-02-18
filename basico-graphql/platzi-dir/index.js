'use strict'

require('dotenv').config() // Esto carga el archivo .env y va caragarlo como variables de entorno
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const cors = require('cors')

const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'

// Definiendo el esquema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), { encoding: 'utf8'})
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

app.use('/api', gqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: isDev // Interface de graphiql para hacer queries
}))

app.listen(port, () => {
  console.log(`Server is listen at http://localhost:${port}`)
})
