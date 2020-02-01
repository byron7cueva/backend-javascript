// Accediendo al proceso y a las variables de entorno
let nombre = process.env.NOMBRE || 'sin nombre';
let web = process.env.WEB || 'no tengo web';
// Ejecutar pasando la variable de entorno
// NOMBRE=valor VARIABLE2=valor2 node entorno.js

console.log(`Hola ${nombre}`);
console.log(`Mi web es ${web}`);
