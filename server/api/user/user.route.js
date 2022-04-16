const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

const AuthMiddleware = require('../auth/auth.middleware');

router.route('/')
  .get(AuthMiddleware.verifyToken, UserController.getUser)
  .post(AuthMiddleware.verifyToken, UserController.newUser);

router.route('/:userId')
  .delete(AuthMiddleware.verifyToken, UserController.deleteUser)
  .get(AuthMiddleware.verifyToken, UserController.getUserId)
  .patch(AuthMiddleware.verifyToken, UserController.updateUser);

module.exports = router;
