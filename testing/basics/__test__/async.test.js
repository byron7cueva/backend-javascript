import { getDataFromApi } from '../promise';

describe('Probar Async/Await', () => {
  test('Realizar una peticion a un api', async () => {
    const api = 'https://rickandmortyapi.com/api/character/';
    const getRick = 'https://rickandmortyapi.com/api/character/1';
    const characters = await getDataFromApi(api);
    expect(characters.results.length).toBeGreaterThan(0);

    const rick = await getDataFromApi(getRick);
    expect(rick.name).toEqual('Rick Sanchez');
  });

  test('Realizando una peticion a un api con error', async () => {
    const apiError = 'http://httpstat.us/404';
    const peticion = getDataFromApi(apiError);
    await expect(peticion).rejects.toEqual(Error('Request failed with status code 404'));
  });

  test('Resuelve un Hola', async () => {
    await expect(Promise.resolve('Hola')).resolves.toBe('Hola');
    await expect(Promise.reject('Error')).rejects.toBe('Error');
  });
});