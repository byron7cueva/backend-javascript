function asincrona(callback) {
  setTimeout(() => {
    try {
      let suma = 3 + z;
      callback(null, suma);
    } catch (err) {
      callback(err);
    }
  }, 1000)
}

asincrona((error, resultado) => {
  if(error) {
    console.log('Ha ocurrido un error');
    console.error(error);
    return false;
  }
  console.log('Todo ha salido bien el resultado es: ', resultado);
})