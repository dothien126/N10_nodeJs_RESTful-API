const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../configs/index.js');

const User = require('./user.model');
const UserService = require('./user.service');

const deleteUser = async (req, res, next) => {
  try {
    const newUserDelete = req.body;
    const { userId } = req.params;
    const result = await UserService.deleteUser(userId);
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
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUserId = await UserService.getUserId(userId);
    return res.status(StatusCodes.OK).json({ user: newUserId });
  } catch (error) {
    next(error);
  }
};

const newUser = async (req, res, next) => {
  const { username, age, email, password, job } = req.body;
  try {
    const user = await UserService.createNewUser(
      username,
      age,
      email,
      password,
      job
    );
    return res.status(StatusCodes.CREATED).json({ user });
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
  newUser,
  updateUser,
};
