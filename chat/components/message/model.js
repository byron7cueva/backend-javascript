const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Definiendo el esquema
 */
const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    date: Date
});

// Definiendo el modelo
// model(nombre_coleccion_mongo, esquema)
const model = mongoose.model('Message', mySchema);

module.exports = model;
