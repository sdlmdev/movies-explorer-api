const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const createMovie = async (req, res, next) => {
  try {
    await Movie.create({ ...req.body, owner: req.user._id });

    res.status(201).send({ message: 'Фильм успешно создан.' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
    } else {
      next(err);
    }
  }
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });

    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new NotFoundError('Фильм с указанным _id не найден.');
    }

    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалить чужой фильм.');
    }

    await movie.deleteOne();

    res.send({ message: 'Фильм успешно удален.' });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные.'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
