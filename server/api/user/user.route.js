const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');

router.route('/')
  .get(UserController.getUser)
  .post(UserController.newUser);

router
  .route('/:userId')
  .delete(UserController.deleteUser)
  .get(UserController.getUserId)
  .patch(UserController.updateUser)

module.exports = router;
