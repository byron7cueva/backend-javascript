'use restrict'

const test = require('ava')
let db = null
const config = {
  logging: () => {}
}

// Esto se ejecuta antes de cada test
test.beforeEach(async () => {
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

test('Agent', t => {
  // Valida que existe un valor no necesariamente verdadero, solo que este no sea
  // cero o vacio
  t.truthy(db.Agent, 'Agent service should exist')
})
