'use strict'

const connectDb = require('./db')
const {ObjectID} = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defauls = {
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defauls, input)
    let db, course

    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId // Es el id del elemento insertado
    } catch(error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async ( root, { _id, input } ) => {
    let db, course

    try {
      db = await connectDb()
      // Acutualizando en la base de datos
      await db.collection('courses').updateOne({ _id: ObjectID(_id) }, { $set: input })
      // Obteniendo el curso actualizado
      course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
    } catch(error) {
      console.error(error)
    }

    return course
  },
  deleteCourse: async ( root, { _id } ) => {
    let db

    try {
      db = await connectDb()
      await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
    } catch (error) {
      console.error(error)
    }
    return true
  },
  addPeople: async (root, { courseId, personId }) => {
    let db, person, course

    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(courseId) })
      person = await db.collection('students').findOne({ _id: ObjectID(personId)})

      if (!course || !person) throw new Error('La persona o el curso no existe')

      // Si la ṕersona ya esta en el courso este no le agrega
      await db.collection('courses')
        .updateOne(
          { _id: ObjectID(courseId) }
          , { $addToSet: { people: ObjectID(personId) }
        })
    } catch(error) {
      console.error(error)
    }
    return course
  },
  createStudent: async (root, { input }) => {
    let db, student

    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId // Es el id del elemento insertado
    } catch(error) {
      errorHandler(error)
    }

    return input
  },
  editStudent: async ( root, { _id, input }) => {
    let db, student

    try {
      db = await connectDb()
      // Actulizando en la base de datos
      await db.collection('students').updateOne({ _id: ObjectID(_id)}, { $set: input })
      // Obteniendo el studiante actualizado
      student = db.collection('students').findOne({ _id: ObjectID(_id) })
    } catch(error) {
      console.error(error)
    }

    return student
  },
  deleteStudent: async (root, { _id }) => {
    let db

    try {
      db = await connectDb()
      await db.collection('students').deleteOne({ _id: ObjectID(_id)})
    } catch(error) {
      console.error(error)
    }

    return true
  }
}