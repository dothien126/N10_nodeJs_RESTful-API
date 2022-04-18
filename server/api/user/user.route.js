const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');
const UserValidate = require('./user.validate')
const AuthMiddleware = require('../auth/auth.middleware');

router.route('/')
  .get(AuthMiddleware.verifyToken, UserController.getUser)

router.route('/:userId')
  .delete(AuthMiddleware.verifyToken, UserValidate.validateParam(UserValidate.idSchema, 'userId'), UserController.deleteUser)
  .get(AuthMiddleware.verifyToken, UserValidate.validateParam(UserValidate.idSchema, 'userId'), UserController.getUserId)
  .patch(AuthMiddleware.verifyToken, UserValidate.validateParam(UserValidate.idSchema, 'userId'), UserValidate.validateUser(UserValidate.userSchemaValidate.userSchema), UserController.updateUser);

module.exports = router;
