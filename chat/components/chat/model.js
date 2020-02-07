const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Definiendo el esquema
 */
const mySchema = new Schema({
    users: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ]
});

// Definiendo el modelo
// model(nombre_coleccion_mongo, esquema)
const model = mongoose.model('Chat', mySchema);

module.exports = model;
