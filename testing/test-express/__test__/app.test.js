const request = require('supertest');
const app = require('../app');

describe('Probar nuestro servidor', () => {
  test('Debe responder al metodo GET', done => {
    request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
      done();
    })
  })
})