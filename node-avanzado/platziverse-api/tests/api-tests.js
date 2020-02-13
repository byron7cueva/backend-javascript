'use strict'

const test = require('ava')
const request = require('supertest')

const server = require('../server')

// Para probar funciones de tipo callback
test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = res.body
      t.deepEqual(body, {}, 'response body shuld be the expected')
      // t.end() Es necesario cuando el test de tipo test.serial.cb indicando que termino
      t.end()
    })
})
