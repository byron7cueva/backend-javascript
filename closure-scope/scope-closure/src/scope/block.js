const fruits = () => {
  if (true) {
    var fruits1 = 'apple';
    let fruits2 = 'banana';
    const fruits3 = 'kiwi';
  }

  // Al definir con var las variables dentro del bloque
  // estas son accesibles dentro del bloque de la funcion
  console.log(fruits1);

  // Con let no podemos acceder ya que con let y const se definen dentro del bloque
  // console.log(fruits2);
  // console.log(fruits3);
}

fruits();
// Pero no son accesibles desde fuera de la función
// El siguiente código me va dar un error de que no se encuentran definidas
/*
console.log(fruits1);
console.log(fruits2);
console.log(fruits3);
*/


let x = 1;
{
  // Con let la x que se define dentro de este bloque no es la misma
  let x = 2;
  console.log(x);
}
console.log(x);


var y = 1;
{
  // Con var la y que se define dentro de este bloque lo que hace es sobreescribir el valor de x
  var y = 2;
  console.log(y);
}
console.log(y);

//

// El siguiente codigo imprime 10 veces 10
// 1. Porque se llaman a ejecutar 10 veces al setTimeout dentro del for
// 2. Cada setTimeout espera que se ejecute primeramente el código en línea para empezar a ejecutarce
// 3. Al ejecutarce cada setTimeout se encuentra con que la variable i es 10
const anotherFunction = () => {
  for (var i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

anotherFunction();

// El siguiente ejemplo funciona igual que el anterior con una diferencia
// De que con let el setTimeout mantiene el valor con el cual se llamo
const anotherFunction2 = () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

anotherFunction2();