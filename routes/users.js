const userRouter = require('express').Router();
const { validationUserInfo } = require('../middlewares/validation');
const { getUser, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', validationUserInfo, updateUser);

module.exports = userRouter;
