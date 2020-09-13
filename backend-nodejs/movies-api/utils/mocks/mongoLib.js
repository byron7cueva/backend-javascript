// sinon: Permite hacer stub of mocks
// Cada ves que creamos un nuevo stub les inyecta unas propiedades
// que nos permite determinar si fue llamado o no

const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

// Creando un stub
const getAllStub = sinon.stub();
// Cuando sea llamado con ciertos argumentos resuelva con cierta respuessta
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama']}};
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createSub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createSub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createSub,
  MongoLibMock
}