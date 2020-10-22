const fruits = () => {
  var fruit = 'apple';
  console.log(fruit);
}

fruits();
// console.log(fruit); // No esta definido ya que esta en el scope local de la funcion


const anotherFunction = () => {
  var x = 1;
  var x = 2; // Sobreescribe a la variable
  let y = 1;
  // let y = 2; // No se puede redeclarar con let o const
  console.log(x);
  console.log(y);
}

anotherFunction();