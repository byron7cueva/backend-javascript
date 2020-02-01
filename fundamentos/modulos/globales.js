// console.log(global);

setImmediate(function() {
  console.log('Hola');
});

global.miVariable = 'el valor';
console.log(miVariable);
