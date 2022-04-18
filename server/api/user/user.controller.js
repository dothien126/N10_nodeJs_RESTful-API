const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../configs/index.js');

const UserSchema = require('./user.validate')
const User = require('./user.model');
const UserService = require('./user.service');

const deleteUser = async (req, res, next) => {
  const newUserDelete = req.body;
  const { userId } = req.params;
  try {
    const result = await UserService.deleteUserById(userId);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Delete successfully ... ' });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await UserService.getAllUser();
    // const {password, __v , ...others} = users
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUserId = await UserService.findUserById(userId);
    return res.status(StatusCodes.OK).json({ user: newUserId });
  } catch (error) {
    next(error);
  }
};


const updateUser = async (req, res, next) => {
  const newUserUpdate = req.body;
  const { userId } = req.params;
  try {
    const result = await UserService.updateUserById(userId, newUserUpdate);
    return res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteUser,
  getUser,
  getUserId,
  updateUser,
};
