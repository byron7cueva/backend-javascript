const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('route - movies', () => {

  // Obteniendo las rutas pero cambiando sus dependencia
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', () => {
    it('Shuld response with status 200', done => {
      request.get('/api/movies').expect(200, done);
    });

    it('Should respond with the list of movies', done => {
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });
        done();
      });
    });
  })
})