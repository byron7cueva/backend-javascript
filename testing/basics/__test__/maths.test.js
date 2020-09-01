import { sumar, multiplicar, restar, dividir } from '../maths';

// Describiendo que es lo que vamos hacer
describe('Calculos matemáticos', () => {
  // Vamos agregando las pruebas
  // Indicando que es lo que estamos probando
  test('Pruebas de suma', () => {
    // Lo que esperamos
    // Esperamos que el resultado sea 2
    expect(sumar(1,1)).toBe(2);
  });

  test('Multiplicar', () => {
    expect(multiplicar(2,2)).toBe(4);
  });

  test('Restar', () => {
    expect(restar(4,2)).toBe(2);
  });

  test('Dividir', () => {
    expect(dividir(9,3)).toBe(3);
  })
});