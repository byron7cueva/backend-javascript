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

// Para definir que nodo fue seleccionado
let selected = {
  uuid: null,
  type: null
}

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
  let idx = 0

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

      const metricName = `${type} ${" ".repeat(10)} ${idx++}`
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
  renderMetric()
}

function renderMetric() {
  let series = [{x: [], y:[], title: ''}];
  if (!selected.uuid && !selected.type) {
    line.setData(series)
    screen.render()
    return
  }

  const metrics = agentMetrics.get(selected.uuid)
  if (metrics) {
    const values = metrics[selected.type]
    series = [{
      title: selected.type,
      // Solo obteniendo los valores timestamp los 10 ultimos
      x: values.map(v => v.timestamp).slice(-10),
      // Solo obteniendo los valores value los 10 ultimos
      y: values.map(v => v.value).slice(-10)
    }]
  }
  line.setData(series)
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
  const { uuid, type } = node

  if (node.agent) {
    node.extended? extended.push(uuid) : extended = extended.filter(a => e !== uuid)
    selected.uuid = null
    selected.type = null
    return
  }

  // Si se selecciona la metrica
  selected.uuid = uuid
  selected.type = type
})

// Capturar las teclas
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  process.exit(0)
})

agent.connect()

// Para iteractuar con el teclado
tree.focus()
screen.render()
