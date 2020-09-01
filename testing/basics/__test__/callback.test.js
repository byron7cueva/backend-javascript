import { callbackHell } from '../callback';

// Funcion Done
// Esta nos permite controlar la ejecucion del test esperando
// a que llamemos a esta funcion. Util para pruebas de promesas, callbacks
// y llamadas asínrcronas

describe('Probando callback', () => {
  test('Callback', done => {
    function otherCallback(data) {
      expect(data).toBe('Hola Javascripter');
      done();
    }
    callbackHell(otherCallback);
  });
});