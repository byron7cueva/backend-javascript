'use strict'

const { MongoClient } = require('mongodb')

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`

let connection

/**
 * Permite conectar con la base de datos
 */
async function connectDB() {
  if (connection) return connection

  let client

  try {
    client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect() 
    connection = client.db(DB_NAME)
  } catch(error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB