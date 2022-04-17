const Jwt = require('jsonwebtoken');
const ls = require('local-storage');
const { StatusCodes } = require('http-status-codes');
const { JWT_SECRET } = require('../../../configs/index');

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const accessToken = ls.get('token');

    if (!accessToken) {
      const error = new Error('Token not found');
      error.statusCode = StatusCodes.UNAUTHORIZED;
      return next(error);
    }

    try {
      const user = Jwt.verify(accessToken, JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authMiddleware;
