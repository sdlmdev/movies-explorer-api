const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const config = require('../config');

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    }

    res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные.'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      config.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }

    res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(
        'Переданы некорректные данные при обновлении профиля',
      ));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });

    res.status(201).send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
    } else if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
};
