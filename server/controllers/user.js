const User = require('../models/user');

const findUsers = async res => {
  try {
    const users = await User.find({});
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const findUserById = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const findUsersByUsername = async (username, res) => {
  try {
    const user = await User.find({ username });
    if (user.length) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const findUsersByEmail = async (email, res) => {
  try {
    const user = await User.find({ email });
    if (user.length) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  try {
    let user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ error: 'Username already used'});
    user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ error: 'Email already used' });
    const newUser = await User.create({ username, email, password });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const UpdateUser = async (id, req, res) => {
  const update = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, update , {new: true});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (id, res) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findUsers,
  findUserById,
  findUsersByUsername,
  findUsersByEmail,
  createUser,
  UpdateUser,
  deleteUser
};
