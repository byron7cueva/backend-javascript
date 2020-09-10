const { Router } = require('express');
const MoviesServices = require('../services/movies');

// Esta funcion recibe el app
// Esto permite ser dinamicos y poder decidir que aplicacion consume nuestra ruta
function movieApi(app) {
  const router = Router();

  const movieService = new MoviesServices();
  app.use('/api/movies', router);

  router.get('/', async function(req, res, next) {
    const { tags } = req.query;

    try {
      const movies = await movieService.getMovies({ tags });
      res.status(200);
      res.json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const movies = await movieService.getMovie({ movieId });
      res.status(200);
      res.json({
        data: movies,
        message: 'movie retrieved'
      })
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function(req, res, next) {
    const { body: movie } = req;

    try {
      const createMovieId = await movieService.createMovie({ movie });
      res.status(201);
      res.json({
        data: createMovieId,
        message: 'movie created'
      })
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', async function(req, res, next) {
    const { body: movie } = req;
    const { movieId } = req.params;

    try {
      const updatedMovieId = await movieService.updateMovie({ movie, movieId});
      res.status(200);
      res.json({
        data: updatedMovieId,
        message: 'movie updated'
      })
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await movieService.deleteMovie({ movieId });
      res.status(200);
      res.json({
        data: deletedMovieId,
        message: 'movie deleted'
      })
    } catch (error) {
      next(error);
    }
  });
}

module.exports = movieApi;