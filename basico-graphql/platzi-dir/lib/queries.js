'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb') // Transforma un id de string a un objeto de id de mongo
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db, courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getCourse: async (root, {id}) => {
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({_id: ObjectID(id)})
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  getStudents: async () => {
    let db, students = []
    try {
      db = await connectDb()
     students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  getStudent: async (root, {id}) => {
    let db, student
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({_id: ObjectID(id)})
    } catch (error) {
      errorHandler(error)
    }
    return student
  }
}