const express = require('express');
const { config } = require('./config/index');

const app = express();
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/json', function(req, res) {
  res.json({hello: 'world'});
});

app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
})
