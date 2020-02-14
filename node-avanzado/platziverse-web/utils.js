'use strict'

/**
 * Para utilizar entre el agente y socket.io
 * @param {EventEmitter} source
 * @param {EventEmmiter} target
 */
function pipe (source, target) {
  if (!source.emit || !target.emit) {
    throw TypeError('Please pass EventEmitter\'s as arguments')
  }

  const emit = source._emit = source.emit

  source.emit = function () {
    emit.apply(source, arguments)
    target.emit.apply(target, arguments)
    return source
  }
}

module.exports = {
  pipe
}
