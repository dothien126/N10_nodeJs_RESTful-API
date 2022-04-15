const User = require('./user.model');
const { StatusCodes } = require('http-status-code');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../configs/index.js');

const encodedToken = (userId) => {
  return Jwt.sign(
    {
      iss: 'Admin',
      sub: userId,
      iat: new Date().getTime(),
      exp: new Date().setTime(new Date().getTime() + 1),
    },
    JWT_SECRET
  );
};

const deleteUser = async (req, res, next) => {
  try {
    const newUserDelete = req.body;
    const { userId } = req.params;
    const result = await User.findByIdAndRemove(userId, newUserDelete);
    return res.status(200).json({ message: 'Delete successfully ... ' });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUserId = await User.findById(userId);
    return res.status(200).json({ user: newUserId });
  } catch (error) {
    next(error);
  }
};

const newUser = async (req, res, next) => {
  try {
    const newUer = new User(req.body);
    await newUser.save();
    return res.status(201).json({ user: newUser });
  } catch (error) {
    next();
  }
};

const signIn = async (req, res, next) => {};

const signUp = async (req, res, next) => {
  const { name, age, email, password, job } = req.body;

  // check email
  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res.status(401).json({ error: 'Email is already in use ...' });

  // create user sign up
  const newUserSignUp = new User({ name, age, email, password, job });
  newUserSignUp.save();

  // encoded token
  const token = encodedToken(newUserSignUp._id);

  return res.status(200).json({ message: 'Sign up successfully ...' });
};

const updateUser = async (req, res, next) => {
  try {
    const newUserUpdate = req.body;
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, newUserUpdate);
    return res.status(200).json({ message: 'Update successfully ... ' });
  } catch (error) {
    next(error);
  }
};

const replaceUser = async (req, res, next) => {
  try {
    const newUserReplace = req.body;
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, newUserReplace);
    return res.status(200).json({ message: 'Replace successfully ... ' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteUser,
  getUser,
  getUserId,
  newUser,
  signIn,
  signUp,
  updateUser,
  replaceUser,
};
