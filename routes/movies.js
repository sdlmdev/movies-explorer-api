const movieRouter = require('express').Router();
const { validationMovie, validationMovieId } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validationMovie, createMovie);
movieRouter.delete('/movies/:id', validationMovieId, deleteMovie);

module.exports = movieRouter;
