const buildCount = (i) => {
  // Recuerda los valores definidos dentro de este alcance
  let count = i;
  // Clousure
  const displayCount = () => {
    console.log(count++);
  };
  return displayCount;
}

const myCount = buildCount(1);
myCount();
myCount();
myCount();

// Se crea un nuevo alcance para el clousure
const myOtherCount = buildCount(10);
myOtherCount();
myOtherCount();