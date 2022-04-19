const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../configs/index.js');
const path = require('path')

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

// create a new user
const createNewUser = async (username, age, email, password, job) => {
  try {
    const user = await new User({
      username,
      age,
      email,
      password,
      job,
    });
    if (!user) throw new Error('User is not invalid');
    return user.save();
  } catch (error) {
    throw error;
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

const upAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.params
    const link = path.join('../../../../public/upload.image', req.file.originalname)
    const rs = await UserService.upPathFile(userId, link)
    return res.status(StatusCodes.OK).json({message: 'Upload avatar successfully.'})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteUser,
  createNewUser,
  getUser,
  getUserId,
  updateUser,
  upAvatar,
};
