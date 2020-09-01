import { getDataFromApi } from '../promise';

describe('Probando promesas', () => {
  test('Realizando una peticion a un api', done => {
    const api = 'https://rickandmortyapi.com/api/character/';
    getDataFromApi(api).then(data => {
      expect(data.results.length).toBeGreaterThan(0);
      done();
    })
  });

  test('Reseulve un Hola!', () => {
    return expect(Promise.resolve('Hola!')).resolves.toBe('Hola!');
  });

  test('Rechaza con error', () => {
    return expect(Promise.reject('Error')).rejects.toBe('Error');
  });
});