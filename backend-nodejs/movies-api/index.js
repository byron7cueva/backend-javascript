const express = require('express');
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const app = express();
moviesApi(app);

app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
})
