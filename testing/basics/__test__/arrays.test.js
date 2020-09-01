import { arrayColors, arrayFruits } from '../arrays';

describe('Comprobaremos que existe un elemento', () => {
  test('Tiene una babana', () => {
    expect(arrayFruits()).toContain('banana');
  });

  test('No contiene un platano', () => {
    expect(arrayFruits()).not.toContain('platano');
  });

  test('Comprobar el tamaño del arreglo', () => {
    expect(arrayFruits()).toHaveLength(6);
  });

  test('Comprobar que existe un color', () => {
    expect(arrayColors()).toContain('azul');
  });
});