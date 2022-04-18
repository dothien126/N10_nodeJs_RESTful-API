const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const UserValidate = require('./user.validate')
const AuthMiddleware = require('../auth/auth.middleware');

router.route('/')
  .get(AuthMiddleware.verifyToken, UserController.getUser)
  .post(AuthMiddleware.verifyToken, userSchemaValidate.validateUser, UserController.newUser);

router.route('/:userId')
  .delete(AuthMiddleware.verifyToken, UserValidate.validateParam, UserController.deleteUser)
  .get(AuthMiddleware.verifyToken, UserValidate.validateParam, UserController.getUserId)
  .patch(AuthMiddleware.verifyToken, UserValidate.validateParam, userSchemaValidate.validateUser, UserController.updateUser);

module.exports = router;
