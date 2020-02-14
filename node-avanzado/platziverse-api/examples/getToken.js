'use strict'

const auth = require('../auth')
const config = require('../config')

auth.sign({
  admin: true,
  username: 'platzi',
  permissions: ['metrics:read']
}, config.auth.secret, (error, token) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(token)
})
