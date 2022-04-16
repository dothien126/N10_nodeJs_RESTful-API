const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller')


/**
 * @swagger
 * /login:
 *   post:
 *     description: Login with username and password.
 *     tags:
 *      - Auth
 *     parameters:
 *       - name: username
 *         description: Username.
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
router.post('/login', AuthController.login)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: username
 *         description: Name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: age
 *         description: Age.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: email
 *         description: Email address.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Register
 */
router.post('/register', AuthController.register)

module.exports = router