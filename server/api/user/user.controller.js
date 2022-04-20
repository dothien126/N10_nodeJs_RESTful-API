const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../configs/index.js');
const path = require('path');

const UserSchema = require('./user.validate');
const User = require('./user.model');
const UserService = require('./user.service');
const bcrypt = require('bcryptjs/dist/bcrypt');

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
    await result.save();
    return res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

const upAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.params;
    const link = path.join(
      '../../../../public/upload.image',
      req.file.originalname
    );
    const rs = await UserService.upPathFile(userId, link);
    await re.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Upload avatar successfully.' });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { userId } = req.params;
  const { password, newPassword, confirmPassword } = req.body;
  if (newPassword === confirmPassword) {
    try {
      const user = await UserService.findUserById(userId);
      const isPassCorrect = await bcrypt.compare(password, user.password);
      if (isPassCorrect) {
        const err = new Error('Password Wrong!');
        err.statusCode = StatusCodes.BAD_REQUEST;
        return next(err);
      }

      // hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(newPassword, salt);
      await UserService.updateUserById(userId, { password: newHashPassword });
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Password has been changed.' });
    } catch (error) {
      next(error);
    }
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please enter password again!' });
  }
};

module.exports = {
  deleteUser,
  changePassword,
  createNewUser,
  getUser,
  getUserId,
  updateUser,
  upAvatar,
};
