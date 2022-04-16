const { required } = require('joi');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
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
});

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
