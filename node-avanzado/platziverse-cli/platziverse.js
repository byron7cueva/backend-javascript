#!/usr/bin/env node

'use restrict'
/* eslint new-cap: "off" */
/* eslint no-unused-vars: "off" */

const blessed = require('blessed')
const contrib = require('blessed-contrib')

// Obteniendo la instancia de screen de blessed
const screen = blessed.screen()

// Creando un grid
const grid = new contrib.grid({
  rows: 1,
  cols: 4,
  screen
})

// Creando un arbo
// set(fila, columna, cunto_en_filas_ocupa, cunto_en_columnas_ocupa, componente_hereda, opciones
const tree = grid.set(0, 0, 1, 1, contrib.tree, {
  label: 'Connected Agents'
})

// Creando la grafica
const line = grid.set(0, 1, 1, 3, contrib.line, {
  label: 'Metric',
  showLegend: true,
  minY: 0,
  xPadding: 5
})

// Capturar las teclas
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0)
})

screen.render()
