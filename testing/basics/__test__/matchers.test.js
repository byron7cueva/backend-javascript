const { TestScheduler } = require("jest");

describe('Comparadores comunes', () => {
  const user = {
    name: 'Byron',
    lastName: 'Cueva'
  }

  const user2 = {
    name: 'Byron',
    lastName: 'Cueva'
  }

  test('Igualdad de elementos', () => {
    expect(user).toEqual(user2);
  });

  test('No son exactamente iguales', () => {
    expect(user).not.toEqual({});
  });
});