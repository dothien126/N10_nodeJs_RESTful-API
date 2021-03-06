const express = require('express');
const router = express.Router();

const uploadSingle = require('../../helper/upload.file');
const UserController = require('./user.controller');
const UserValidate = require('./user.validate');
const AuthMiddleware = require('../auth/auth.middleware');

router.route('/users/').get(AuthMiddleware.verifyToken, UserController.getUser);

router
  .route('/users/:userId')
  .delete(
    AuthMiddleware.verifyToken,
    UserValidate.validateParam(UserValidate.idSchema, 'userId'),
    UserController.deleteUser
  )
  .get(
    AuthMiddleware.verifyToken,
    UserValidate.validateParam(UserValidate.idSchema, 'userId'),
    UserController.getUserId
  )
  .patch(
    AuthMiddleware.verifyToken,
    UserValidate.validateParam(UserValidate.idSchema, 'userId'),
    UserValidate.validateUser(UserValidate.userSchemaValidate.userSchema),
    UserController.updateUser
  );

router.patch(
  '/users/avatar/:userId',
  AuthMiddleware.verifyToken,
  uploadSingle,
  UserController.upAvatar
);

router.patch(
  '/users/changePass/:userId',
  AuthMiddleware.verifyToken,
  UserValidate.validateParam(UserValidate.idSchema, 'userId'),
  UserValidate.validateUser(UserValidate.userSchemaValidate.changePassSchema),
  UserController.changePassword
);

router.get('/test', UserController.getUser)
router.post('/test', UserController.createNewUser)
module.exports = router;
