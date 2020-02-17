'use strict'

const connectDb = require('./db')
const {ObjectID} = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db, peopleData, ids

      try {
        db = await connectDb()
        ids = people? people.map(id => ObjectID(id)) : []
        peopleData = ids.length > 0
          ? await db.collection('students').find({ _id: { $in: ids }}).toArray()
          : []
      } catch (error) {
        errorHandler(error)
      }

      return peopleData
    }
  },
  Person: {
    /**
     * Para resolver el tipo de la interface Person
     */
    __resolveType: (person, context, info) => {
      // Si la persona tiene datos de telefono es un Monitor
      if (person.phone) {
        return 'Monitor'
      }
      // Si no se asume que es un estudiante
      return 'Student'
    }
  },
  /**
   * Para resolver el tipo de la union GlobalSerach
   */
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      // Si el item tiene el campo title es un curso
      if (item.title) return 'Course'
      // Si el item tiene el campo telefono es un monitor
      if (item.phone) return 'Monitor'
      // Si no se asume es un estudiante
      return 'Student'
    }
  }
}