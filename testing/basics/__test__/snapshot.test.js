import { getCharacter } from '../snapshot';
import rick from '../rick.json'

describe('Es hora de las instantaneas', () => {
  test('snapshot', () => {
    expect(getCharacter(rick)).toMatchSnapshot();
  });

  test('Siempre fallara la instantanea', () => {
    const user = {
      createAt: new Date(),
      id: Math.floor(Math.random() * 20)
    };

    expect(user).toMatchSnapshot();
  });

  test('Excepciones en el snapshot', () => {
    const user = {
      id: Math.floor(Math.random() * 20),
      name: 'Byron Cueva'
    };

    expect(user).toMatchSnapshot({
      id: expect.any(Number) // Indicandole que este tip de dato va ser numero y no importa si cambia
    });
  });
});