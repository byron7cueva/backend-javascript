// La siguiente funcion no genera un clousure
// No almacena los valores
const moneyBox = (coins) => {
  var saveCoins = 0;
  saveCoins += coins;
  console.log(`MoneyBox: $${saveCoins}`);
}

moneyBox(5);
moneyBox(10);


//
// La siguiente funcion recuerda el valor de la asignación anterior
const moneyBoxClousure = () => {
  var saveCoins = 0;
  const countCoins = (coins) => {
    saveCoins += coins;
    console.log(`MoneyBox: $${saveCoins}`);
  }
  return countCoins;
}

// Generando el ambito sobre el cual se va ejecutar
let myMoneyBox = moneyBoxClousure();
myMoneyBox(4);
myMoneyBox(6);
myMoneyBox(10);