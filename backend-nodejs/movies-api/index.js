const express = require('express');

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const {
  logError,
  errorHandle,
  wrapErrors
} = require('./utils/middleware/errorHandler');
const noFoundHandle = require('./utils/middleware/notFoundHandle');

const app = express();

// body parser
app.use(express.json());

moviesApi(app);

// Despues de todas las rutas
// Capturar el 4040
app.use(noFoundHandle);

// Manejadores de errores
// Los middleware de error siempre deben ir despues de las rutas
app.use(logError);
app.use(wrapErrors);
app.use(errorHandle);

app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
})
