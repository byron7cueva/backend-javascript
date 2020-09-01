import { numbers } from '../numbers';

// No necesita para correr un test el bloque de describe
// Pero nos ayuda a tener mas organizado en bloques los test
describe('Comparación de números', () => {
  test('Mayor que', () => {
    expect(numbers(2,2)).toBeGreaterThan(3);
  });

  test('Mayor que o igual', () => {
    expect(numbers(2,2)).toBeGreaterThanOrEqual(4);
  });

  test('Menor que', () => {
    expect(numbers(2,2)).toBeLessThan(10);
  });

  test('Menor que o igual', () => {
    expect(numbers(2,2)).toBeLessThanOrEqual(4);
  });

  test('Numeros flotantes', () => {
    expect(numbers(0.2, 0.2)).toBeCloseTo(0.4);
  });
});