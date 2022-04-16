const User = require('./user.model');

// get all users
const getAllUser = () => User.find({});
// find user by id
const findUserById = id => User.findById(id);
// find User by Username
const findUserByUsername = username => User.findOne({ username });
// create a new user
const createNewUser = (username, age, email, password, job) => {
  const newUser = new User({
    username,
    age,
    email,
    password,
    job,
  });
  return newUser.save()
};
// update user by username
const updateUserByUsername = (username, userUpdate) =>
  User.findOneAndUpdate({ username }, userUpdate);
// update user by id
const updateUserById = (id, userUpdate) =>
  User.findOneAndUpdate({ _id: id }, userUpdate);

module.exports = {
  createNewUser,
  findUserById,
  findUserByUsername,
  getAllUser,
  updateUserById,
  updateUserByUsername,
  
};
