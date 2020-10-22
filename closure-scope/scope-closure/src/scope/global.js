// Scope Global
var hello = 'HELLO';
let world = 'Hello World';
const helloWorld = 'Hello World!';

const anotherFunction = () => {
  console.log(hello);
  console.log(world);
  console.log(helloWorld);
}

anotherFunction();

const helloWorld = () => {
  // Lo siguiente crea una varibale global a pesar de estar dentro de una función
  globalVar = 'im global'
}

helloWorld();
console.log(globalVar);

const anotherFuntion2 = () => {
  var localVar = globalVar = 'Im Global';
}

anotherFuntion2();
// console.log(localVar); // No se encuentra en el ambito global