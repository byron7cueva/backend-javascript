// Clousure con un ámbito de bloque
const anotherFunction = () => {
  // let nos permite manejar un scope de equipo bloque
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}

anotherFunction();