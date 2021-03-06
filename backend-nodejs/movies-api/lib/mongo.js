const debug = require('debug')('app:db');
const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

// Nos permite no tener problema cons los caracteres especiales
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//mongodb+srv://<username>:<password>@<host>/<dbname>?retryWrites=true&w=majority
// `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=mayority`;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {

  constructor() {
    this.cilent = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.cilent.connect(error => {
          if(error) {
            reject(error);
          }

          debug('Connect succesfully to mongo');
          resolve(this.cilent.db(this.dbName));
        })
      })
    }

    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray();
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({_id: ObjectId(id)});
    })
  }

  create(collection, data) {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data);
    }).then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true});
    }).then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({_id: ObjectId(id)});
    }).then(() => id);
  }
}

module.exports = MongoLib;