// Promesas

function hola(nombre) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log(`Hola ${nombre}`);
      resolve(nombre);
    }, 1500);
  });
}

function hablar(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log('Bla bla bla bla.....');
      resolve(nombre);
    }, 1000);
  });
}

function adios(nombre) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log(`Adios ${nombre}`);
      resolve();
    }, 1000);
  });
}

hola('Byron')
  .then(hablar)
  .then(hablar)
  .then(hablar)
  .then(adios)
  .then(() => {
    console.log('Termino el proceso');
  })
  .catch(error => {
    console.log('Ha habido un error');
    console.log(error);
  });
