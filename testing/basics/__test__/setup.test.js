// Despues de cada prueba
afterEach(() => console.log('Despues de cada prueba'));
afterAll(() => console.log('Despues de todas las pruebas'));

// Antes de cada Prueba
beforeAll(() => console.log('Antes de todas las pruebas'));
beforeEach(() => console.log('Antes de cada prueba'));

describe('preparar antes de ejecutar', () => {
  test('Es verdadero', () => {
    expect(true).toBeTruthy();
  });
});