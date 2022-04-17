const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const userSchemaValidate = require('./user.validate')
const AuthMiddleware = require('../auth/auth.middleware');

router.route('/')
  .get(UserController.getUser)
  .post(userSchemaValidate.validateUser, UserController.newUser);

router.route('/:userId')
  .delete(UserController.deleteUser)
  .get(UserController.getUserId)
  .patch(UserController.updateUser);

module.exports = router;
