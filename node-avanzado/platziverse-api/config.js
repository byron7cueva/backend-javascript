'use restrict'

const debug = require('debug')('platziverse:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'desarrollo',
    password: process.env.DB_PASS || 'desarrollo',
    host: process.env.Db_HOST || '192.168.1.2',
    dialect: 'postgres',
    logging: message => debug(message)
  },
  auth: {
    secret: process.env.SECRET || 'platzi'
  }
}
