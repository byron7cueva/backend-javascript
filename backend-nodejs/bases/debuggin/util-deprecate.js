const util = require('util')

//Es un wrapper para indicar que esta deprecado
const helloPluto = util.deprecate(() => {
  console.log('hello pluto')
}, 'pluto is deprecated. It is not a planet anymore')

helloPluto()