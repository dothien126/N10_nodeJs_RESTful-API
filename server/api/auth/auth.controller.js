const bcrypt = require('bcryptjs');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const Jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('../user/user.model');
const UserService = require('../user/user.service');
const AuthValidation = require('./auth.validate');

const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require('../../../configs/index');

const login = async (req, res, next) => {
  const users = await UserService.getAllUser();
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  // check user exist on database
  if (!user) {
    const err = new Error(`Email is not invalid`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // check hash password
  const isPassword = await bcrypt.compare(password, user.password);
  if (isPassword) {
    const err = new Error(`Incorrect Password`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  // encoded token
  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    path: '/',
    sameSite: 'strict'
  })
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Login successfully!', accessToken });
};

const register = async (req, res, next) => {
  const users = await UserService.getAllUser();
  const { username, age, email, password, job } = req.body;
  console.log(username, age, email, password, job);
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
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Registered successfully!' });
  } catch (error) {
    next(error);
  }
};

// Redis
const requestRefreshToken = async (req, res) => {
  const users = await UserService.getAllUser();
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  // check user exist on database
  if (!user) {
    const err = new Error(`Email is not invalid`);
    err.statusCode = StatusCodes.BAD_REQUEST;
    return next(err);
  }
  const refreshToken = req.cookies.refreshToken
  if(!refreshToken)
    return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Token is not invalid. You are not authenticated!'}) 

  Jwt.verify(refreshToken, REFRESH_JWT_SECRET, (err, user) => {
    if(err) {
      const err = new Error(`Token it not invalid`);
      err.statusCode = StatusCodes.BAD_REQUEST;
      return next(err);
    } 
    const newAccessToken = user.createAccessToken(user)
    const newRefreshToken = user.createRefreshToken(user)
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict'
    })
    user.newRefreshToken = newRefreshToken
    user.save()
    return res.status(StatusCodes.OK).json({accessToken: newAccessToken})

  })
}
module.exports = {
  login,
  register,
};
