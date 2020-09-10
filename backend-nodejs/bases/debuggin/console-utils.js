const util = require('util')

// %s para string
// %d nuemro
// %j json
console.log("Un %s y un %s", "perrito", "gatito")
util.format("Un %s y un %s", "perrito", "gatito")

console.info('Alias de log')
console.warn('Alias de error')
//Imprimir aserciones
console.assert(42 === '42')

// Nos indica la linea donde se dio el error
console.trace('hello')

//Nuevo debugin que va tener un namespace
const debuglog = util.debuglog('foo')
// Solo nos imprime so pasamos la variable de entorno con el namespace
// NODE_DEBUG=foo node console-utils.js
debuglog('hello from foo')
