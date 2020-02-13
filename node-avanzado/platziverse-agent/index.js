'use strict'

const {EventEmitter} = require('events');

class PlatziverseAgent extends EventEmitter {
  constructor (ops) {
    super()

    this._ops = ops
    this._started = false
    this._timer = null
  }

  connect () {
    if (!this._started) {
      this.emit('connected')
      this._started = true
      this._timer = setInterval(() => {
        this.emit('agent/message', 'this is a message')
      }, this._ops.interval)      
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