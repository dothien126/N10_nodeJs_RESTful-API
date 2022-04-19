const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');

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
router.route('/login').post(AuthController.login);

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
router.route('/register').post(AuthController.register);

router.post('/refreshToken', AuthController.requestRefreshToken);

module.exports = router;
