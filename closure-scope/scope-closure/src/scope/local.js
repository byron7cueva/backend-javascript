const helloWorld = () => {
  const hello = 'Hello World';
  console.log(hello);
}

helloWorld();
// console.log(hello); // No se puede acceder a la variable ya que no esta definida de forma global

// Ambito Lexico
var scope = 'i am global';

const functionScope = () => {
  // Se crea otra variable llamada scope, no sobreescribe la global
  var scope = 'i am just a local';

  const func = () => {
    // Ambito lexico
    return scope
  }
  console.log(func());
}

functionScope();
console.log(scope);