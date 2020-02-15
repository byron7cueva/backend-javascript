#!/usr/bin/env node

'use restrict'
/* eslint new-cap: "off" */
/* eslint no-unused-vars: "off" */

const blessed = require('blessed')
const contrib = require('blessed-contrib')
const moment = require('moment')
const PlaziverseAgent = require('platziverse-agent')

// Obteniendo la instancia de screen de blessed
const agent = new PlaziverseAgent()
const screen = blessed.screen()
const agents = new Map()
const agentMetrics = new Map()

// Se va almacenar los ids de los componentes que extendemos
let extended = []

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
      // De esa manera quedara extendido
      extended: extended.includes(uuid),
      children: {}
    }

    // Obteniendo las metrcias del agente
    const metrics = agentMetrics.get(uuid)
    Object.keys(metrics).forEach(type => {
      const metric = {
        uuid,
        type,
        metric: true
      }

      const metricName = `${type}`
      // Agregando un hijo del agente
      treeData[title].children[metricName] = metric
    })
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
  const { uuid } = payload.agent

  // Si el agente esta en el mapa se borra ya que se desconecto
  if(agents.has(uuid)) {
    agents.delete(uuid)
    agentMetrics.delete(uuid)
  }

  renderData()
})

agent.on('agent/message', payload => {
  const { uuid } = payload.agent
  const { timestamp } = payload

  // Si no existe ese agente en el mapa
  if (!agents.has(uuid)) {
    agents.set(uuid, payload.agent)
    agentMetrics.set(uuid, {})
  }

  const metrics = agentMetrics.get(uuid)

  payload.metrics.forEach(m => {
    const { type, value } = m
    if (!Array.isArray(metrics[type])) {
      metrics[type] = []
    }

    const length = metrics[type].length
    if (length >= 20) {
      metrics[type].shift()
    }

    metrics[type].push({
      value,
      timestamp: moment(timestamp).format('HH:mm:ss')
    })
  })

  renderData()
})

// Cuando seleccione un elemento
tree.on('select', node => {
  const { uuid } = node

  if (node.agent) {
    node.extended? extended.push(uuid) : extended = extended.filter(a => e !== uuid)
  }
})

// Capturar las teclas
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0)
})

agent.connect()

// Para iteractuar con el teclado
tree.focus()
screen.render()
