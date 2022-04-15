const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller')

router.route('/login')
    .post(AuthController.login)
router.route('/register')
    .post(AuthController.register)

module.exports = router