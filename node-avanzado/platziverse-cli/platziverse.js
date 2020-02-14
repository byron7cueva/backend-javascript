#!/usr/bin/env node

// Hash bank en unix
// Que dice este escript que viene a continuacion vamos a ejecutarlo con este binario
'use strict'

/*
const minimist = require('minimist')
const args = minimist(process.argv)
console.log(args.host)
console.log(args.name)
*/

// Un array
// [0] Binario de node
// [1] El archivo que esta ejecutando
// Los siguientes argumentos que le paso al ejecutar
// console.log(process.argv)

const args = require('args')

args
  .option('port', 'The port on which the app will be running', 3000)
  .option('reaload', 'Enable/disable livereloading')
  .command('serve', 'Serve you static site', ['s'])

  const flags = args.parse(process.argv)
  // ./platziverse.js -h Devuelve las opciones que tiene el comando


console.log('Hello platziverse')