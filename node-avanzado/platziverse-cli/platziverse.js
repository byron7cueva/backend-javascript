#!/usr/bin/env node

'use restrict'
/* eslint new-cap: "off" */
/* eslint no-unused-vars: "off" */

const blessed = require('blessed')
const contrib = require('blessed-contrib')
const PlaziverseAgent = require('platziverse-agent')

// Obteniendo la instancia de screen de blessed
const agent = new PlaziverseAgent()
const screen = blessed.screen()
const agents = new Map()
const agentMetrics = new Map()

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

function renderData () {
  const treeData = {}

  for (let [ uuid, val ] of agents) {
    const title = `${val.name} - (${val.pid})`
    treeData[title] = {
      uuid,
      agent: true,
      children: {}
    }
  }

  // Asignando los datos al componente
  tree.setData({
    extended: true,
    children: treeData
  })

  // Se necesita renderizar nuevamente la pantalla
  screen.render()
}

agent.on('agent/connected', payload => {
  const { uuid } = payload.agent
  if (!agents.has(uuid)) {
    agents.set(uuid, payload.agent)
    agentMetrics.set(uuid, {})
  }

  renderData()
})

agent.on('agent/disconnected', payload => {

})

agent.on('agent/message', payload => {

})

// Capturar las teclas
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0)
})

agent.connect()
screen.render()
