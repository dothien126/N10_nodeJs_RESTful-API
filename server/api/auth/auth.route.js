const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login with email and password.
 *     tags:
 *      - Auth
 *     parameters:
 *       - name: email
 *         description: Email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: login
 */
router.route('/login').post(AuthController.login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: name
 *         description: Name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: repeatPassword
 *         description: Repeat pass word.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email address.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Register
 */
router.route('/register').post(AuthController.register);

router.post('/refreshToken', AuthController.requestRefreshToken);

module.exports = router;
