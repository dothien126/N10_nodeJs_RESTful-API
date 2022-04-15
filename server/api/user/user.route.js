const express = require('express');
const router = express.Router();
const UserController = require('./user.controller');


router.route('/')
  .get(UserController.getUser)
  .post(UserController.newUser);

router.route('/signIn').post(UserController.signIn);
router.route('/signup').post(UserController.signUp);

router
  .route('/:userId')
  .delete(UserController.deleteUser)
  .get(UserController.getUserId)
  .patch(UserController.updateUser)
  .put(UserController.replaceUser);

module.exports = router;
