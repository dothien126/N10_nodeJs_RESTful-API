const Jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } = require('../../../configs/index');

const decodeAccessToken = async (token) => {
  try {
    const decode = Jwt.verify(token, ACCESS_JWT_SECRET)
    const user = await getOneUser({ _id: decode._id })
    
    return user
  } catch (error) {
    return null
  }
}

const decodeRefreshToken = async (token) => {
  try {
    const decode = Jwt.verify(token, REFRESH_JWT_SECRET)
    const user = await getOneUser({ _id: decode._id })
    
    return user
  } catch (error) {
    return null
  }
}

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const accessToken = req.header('Authorization');

    if (!accessToken) {
      const error = new Error('Token not found');
      error.statusCode = StatusCodes.UNAUTHORIZED;
      return next(error);
    }

    const token = accessToken.split('')[1]

    try {
      const user = await decodeAccessToken(token);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authMiddleware;
