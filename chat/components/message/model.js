const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Definiendo el esquema
 */
const mySchema = new Schema({
    user: String,
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
