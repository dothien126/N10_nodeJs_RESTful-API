const { get } = require('superagent');
const User = require('./user.model');

// get all users
const getAllUser = async () => {
  try {
    const users = User.find({}).select(' username age email job ');
    return users;
  } catch (error) {
    throw error;
  }
};

// find user by id
const findUserById = async (id) => {
  return User.findById(id)
};

// find User by Username
const findUserByEmail = async (email) => {
  return User.findOne({email})
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
// update user by username
const updateUserByUsername = async (username, userUpdate) => {
  try {
    const user = await User.findOneAndUpdate({ username }, userUpdate);
    if (!user) throw new Error('User is not invalid');
    return user;
  } catch (error) {
    throw error;
  }
};

// update user by id
const updateUserById = async (id, userUpdate) => {
  try {
    const user = await User.findOneAndUpdate({ id }, userUpdate);
    if (!user) throw new Error('User is not invalid');
    return user;
  } catch (error) {
    throw error;
  }
};

// delete user by id
const deleteUserById = async (userId) => {
  try {
    const user = await findUserById(userId);
    if (!user) throw new Error('User is not invalid');
    await user.remove()
    return user;
  } catch (error) {
    throw error;
  }
};

const upPathFile = async (userId, link) => {
  try {
    const user = await User.findOneAndUpdate({ userId }, { linkImage: link });
    if (!user) throw new Error('User is not invalid');
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewUser,
  deleteUserById,
  findUserById,
  findUserByEmail,
  getAllUser,
  updateUserById,
  updateUserByUsername,
  upPathFile,
};
