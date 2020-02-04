console.log('Algo');
console.info('Informacion');
console.error('Ocurrio un error');
console.warn('Potencial error');

// Muetra los datos de forma de tabla o modulo
// La tabula
var tabla = [
  {a:1,b:'Una cosa'},
  {a:2,b:'Otra'}
]
console.table(tabla);

// Permite agrupar un grupo de logs para decir que tratan de algo en comun
console.group('Conversación');
console.log('Hola');
console.log('Bla');
console.log('Bla')
console.log('Adios');
console.groupEnd('Conversación');

function funcion1(){
  console.group('funcion 1');
  console.log('Esto es de la función 1');
  console.log('Esto tambien es de la funcion 1');
  funcion2();
  console.log('He vuelto a la funcion 1');
  console.groupEnd('funcion 1')
}

function funcion2() {
  console.group('funcion 2');
  console.log('Esto es de la funcion 2');
  console.log('Esto tambien es de la funcion 2');
  console.groupEnd('funcion 2');
}

funcion1();

// Contadores
console.count('veces');
console.count('veces');
console.count('veces');
//Resetendo el contador
console.countReset('veces');
console.count('veces');
console.count('veces');