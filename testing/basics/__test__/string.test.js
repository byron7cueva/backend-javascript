describe('Comprobar cadenas de texto', () => {
  const text = 'un bonito texto';

  test('Debe contener el siguiente texto', () => {
    expect(text).toMatch(/bonito/);
  });

  test('No contiene la siguiente texto', () => {
    expect(text).not.toMatch(/es/);
  });

  test('Comprobar el tamaño de un testo', () => {
    expect(text).toHaveLength(15);
  });
});