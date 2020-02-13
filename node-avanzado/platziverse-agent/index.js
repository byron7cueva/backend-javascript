'use strict'

const debug = require('debug')('platziverse:agent')
const mqtt = require('mqtt')
const defaults = require('defaults')
const uuid = require('uuid')
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

        this._timer = setInterval(() => {
          this.emit('agent/message', 'this is a message')
        }, this._ops.interval)
      })

      this._client.on('message', (topic, payload) => {
        const payload = parsePayload(payload)

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
      this.emit('disconnected')
      this._started = false
    }
  }
}

module.exports = PlatziverseAgent