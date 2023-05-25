const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validatorEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validatorEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
