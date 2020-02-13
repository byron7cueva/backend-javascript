const http = require('http')
const express = require('express')
const chalk = require('chalk')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
})