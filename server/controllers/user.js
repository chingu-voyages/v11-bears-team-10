const User = require('../models/user');

const findUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findUser = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async ({ username, email, password }) => {
  try {
    const user = await User.find({ username });
    if (user) return { error: 'username exist' };
    const userEmail = await User.find({ email });
    if (userEmail) return { error: 'email exist' };
    const newUser = await User.create({ username, email, password });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UpdateUser = async (id, update) => {
  try {
    const user = await User.findByIdAndUpdate({ id, update });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteUser = async id => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  UpdateUser,
  deleteUser
};
