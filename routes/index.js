const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validationLogin, validationCreateUser } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use(usersRouter);
router.use(moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес не найден.'));
});

module.exports = router;
