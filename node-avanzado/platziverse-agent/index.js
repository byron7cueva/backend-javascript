'use strict'

const debug = require('debug')('platziverse:agent')
const mqtt = require('mqtt')
const defaults = require('defaults')
const uuid = require('uuid')
const os = require('os')
const {promisify} = require('util') // Desde node8
const {EventEmitter} = require('events');
const {parsePayload} = require('./utils')

const options = {
  name: 'untitled',
  username: 'platzi',
  interval: 5000,
  mqtt: {
    host: 'mqtt://localhost'
  }
}

class PlatziverseAgent extends EventEmitter {
  constructor (ops = {}) {
    super()

    this._ops = defaults(ops, options)
    this._started = false
    this._timer = null
    this._client = null
    this._agentId = null
    this._metrics = new Map()
  }

  addMetric (type, fn) {
    this._metrics.set(type, fn)
  }

  removeMetric (type) {
    this._metrics.delete(type)
  }

  connect () {
    if (!this._started) {
      // Conectando al servidor mqtt
      this._client = mqtt.connect(this._ops.mqtt.host)

      // Registrandome a los topicos
      this._client.subscribe('agent/message')
      this._client.subscribe('agent/connected')
      this._client.subscribe('agent/disconnected')

      this._client.on('connect', () => {
        this._agentId = uuid.v4()
        this._started = true
        this.emit('connected', this._agentId)

        this._timer = setInterval(async () => {
          if (this._metrics.size > 0) {
            let message = {
              agent: {
                uuid: this._agentId,
                name: this._ops.name,
                username: this._ops.username,
                hostname: os.hostname() || 'localhost',
                pid: process.pid
              },
              metrics: [],
              timestamp: new Date().getTime()
            }
              // Destructurin
            for (let [metric, fn] of this._metrics) {
              // Functionariti: El tamaño de los argumentos de una funcion
              if (fn.length === 1) {
                // Si es callback entonces la convierto a una promesa
                fn = promisify(fn)
              }
              message.metrics.push({
                type: metric,
                // Ejecuta una funcion estatico, o una promesa
                value: await Promise.resolve(fn())
              })
            }

            debug(`Sending`, message)

            // Emitiendo al servisor mqtt
            this._client.publish('agent/message', JSON.stringify(message))

            // Emitiendo a los suscriptores del agente
            this.emit('message', message)
          }
        }, this._ops.interval)
      })

      this._client.on('message', (topic, payload) => {
        payload = parsePayload(payload)

        // Reentrasmitir el mensaje de nos llega desde el servidor mqtt
        let broadcast = false
        switch (topic) {
          case 'agent/connected':
          case 'agent/disconnected':
          case 'agent/message':
            broadcast = payload && payload.agent && payload.agent.uuid !== this._agentId
            break
        }

        if (broadcast) {
          this.emit(topic, payload)
        }
      })

      this._client.on('error', () => this.disconnect())
    }
  }

  disconnect () {
    if (this._started) {
      clearInterval(this._timer)
      this._client.end()
      this._started = false
      this.emit('disconnected', this._agentId)
    }
  }
}

module.exports = PlatziverseAgent