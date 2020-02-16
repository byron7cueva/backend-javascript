'use strict'

const { graphql, buildSchema } = require('graphql')

// Definiendo el esquema
const schema = buildSchema(`
  type Query {
    hello: String,
    saludo: String
  }
`)

// Configurando los resolvers
const resolvers = {
  hello: () => {
    return 'Hola mundo'
  },
  saludo: () => {
    return 'Hola a todos'
  }
}

// Ejecutar el query hello
// graphql(esquema, lo_que_vamos_a_ejecutar)
graphql(schema, '{ hello }')
  .then(data => {
    console.log(data)
  })

graphql(schema, '{ saludo }', resolvers)
  .then(data => {
    console.log(data)
  })