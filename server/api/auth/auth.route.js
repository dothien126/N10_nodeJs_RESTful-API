const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');
const AuthValidate = require('./auth.validate')

/** 
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a new user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Login a new user with email and password
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *          description: Login fail ... Please again !
 */
router.route('/users/login').post( AuthValidate.validateAuth(AuthValidate.loginSchema), AuthController.login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Register a new user with user-data
 *     responses:
 *       201:
 *         description: Register successfully
 *       400:
 *          description: Register fail ... Please again !
 */
router.route('/users/register').post(AuthValidate.validateAuth(AuthValidate.registerSchema), AuthController.register);

router.post('/users/refreshToken', AuthController.requestRefreshToken);

module.exports = router;
