const { config } = require('../config');

function cacheResponse(res, seconds) {
  if(!config.dev) {
    // Asignando en la cabecera
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;