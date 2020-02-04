let suma = 0;

console.time('todo');
console.time('bucle');
for(let i = 0; i < 10000000; i++) {
  suma++;
}
console.timeEnd('bucle');

let suma2 = 0;

console.time('bucle2');
for(let j = 0; j < 100000000; j++) {
  suma2++;
}
console.timeEnd('bucle2');

console.time('asincrona');
console.log('Se llama a la funcion asincrona');
asincrona()
  .then(() => {
    console.timeEnd('asincrona');
  });

console.timeEnd('todo');

function  asincrona() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Termino el proceso asincrono');
      resolve();
    }, 1000);
  });
}

