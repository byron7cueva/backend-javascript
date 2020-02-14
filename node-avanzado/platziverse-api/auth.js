'use strict'

const jwt = require('jsonwebtoken')

/**
 * Frima el toquen
 * @param {*} payload
 * @param {*} secret
 */
function sign (payload, secret, callback) {
  jwt.sign(payload, secret, callback)
}

/**
 * Verifica el token
 */
function verify (token, secret, callback) {
  jwt.verify(token, secret, callback)
}

module.exports = {
  sign,
  verify
}
