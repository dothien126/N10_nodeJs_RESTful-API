const { required } = require('joi');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Jwt = require('jsonwebtoken');

const {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = require('../../../configs/index');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  job: {
    type: String,
  },
  linkImage: {
    type: String,
  }
},
  {timestamps: true}
);

// create access token
UserSchema.methods.createAccessToken = function () {
  const user = this;
  const accessToken = Jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: '5m',
    }
  );
  return accessToken;
};

// create refresh token
UserSchema.methods.createRefreshToken = function () {
  const user = this;
  const refreshToken = Jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
};

UserSchema.pre('save', async function (next) {
  try {
    // gen salt
    const salt = await bcrypt.genSalt(10);
    // gen password hashed
    const passwordHashed = await bcrypt.hash(this.password, salt);
    //re-assign password
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
