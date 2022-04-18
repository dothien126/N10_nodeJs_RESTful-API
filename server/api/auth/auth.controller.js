const bcrypt = require('bcryptjs');
const express = require('express');
const ls = require('local-storage');
const { StatusCodes } = require('http-status-codes');
const Jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const UserService = require('../user/user.service');
const AuthValidation = require('./auth.validate');

const { JWT_SECRET } = require('../../../configs/index');

const login = async (req, res, next) => {
  const users = await UserService.getAllUser();
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  // check user exist on database
  if (!user) {
    const err = new Error(`Email is not invalid`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // check hash password
  const isPassword = await bcrypt.compare(password, user.password);
  console.log(password, user.password)
  if (isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // encoded token
  const token = Jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '3h',
    }
  );
  ls.set('token', token);
  return res.status(StatusCodes.OK).json({message: 'Login successfully!' });
};

const register = async (req, res, next) => {
  const users = await UserService.getAllUser();
  const { username, age, email, password, job } = req.body;
  console.log(username, age, email, password, job)
  const isValidUser = await AuthValidation.registerSchema.validate({
    username,
    age,
    email,
    password,
    job,
  });
  //validate user
  if (isValidUser.error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: isValidUser.error.details });

  // check email
  const isUserMail = users.some((user) => user.email === email);
  if (isUserMail) {
    const error = new Error(`Email ${email} has already in use!`);
    error.statusCode = StatusCodes.BAD_REQUEST;
    return next(error);
  }
  try {
    // create user
    const newUser = await UserService.createNewUser(
      username,
      age,
      email,
      password,
      job
    );
    newUser.save();
    // encoded token
    const token = Jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3h',
      }
    );
    ls.set('token', token);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Registered successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
