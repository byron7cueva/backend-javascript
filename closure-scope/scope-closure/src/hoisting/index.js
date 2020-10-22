a = 2; // El Hoisting eleva las declaraciones
// Es decir pasa la declaracion var arriba en el código y luego la asignación
var a;

console.log(a);

// En el siguiente caso a la variable a le asigna el valor de undefine
console.log(b);
var a = 2;

//

nameOfDog('Mambol');

function nameOfDog(name) {
  console.log(name);
}
