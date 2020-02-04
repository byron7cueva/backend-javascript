// Modulo para el manejo de fechas
const moment = require('moment');

let ahora = moment();

console.log(ahora.toString());
// Dar formato a la fechas
console.log(ahora.format('YYYY/MM/DD - HH:mm'));