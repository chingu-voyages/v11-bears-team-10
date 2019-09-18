const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.SECRET || 'my secret';

const findUsers = async res => {
  try {
    const users = await User.find({}, 'username');
    if (!users.length) return res.status(400).json({ error: 'Not Found' });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findUserById = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findUsersByUsername = async (username, res) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findUsersByEmail = async (email, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(401).json({ error: 'Username already used' });
    user = await User.findOne({ email });
    if (user) return res.status(401).json({ error: 'Email already used' });
    const newUser = await User.create({ username, email, password });
    await newUser.save();
    const playload = { id: newUser._id };
    const token = jwt.sign(playload, secret, { expiresIn: 60 * 60 * 24 });
    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UpdateUser = async (id, req, res) => {
  if (!req.user._id.equals(id)) {
    return res.status(401).end();
  }
  const update = req.body;
  if (update.username !== req.user.username) {
    user = await User.findOne({ username: update.username });
    if (user) return res.status(401).json({ error: 'Username already used' });
  }
  if (update.email !== req.user.email) {
    user = await User.findOne({ email: update.email });
    if (user) return res.status(401).json({ error: 'email already used' });
  }
  try {
    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (id, req, res) => {
  if (id !== '' + req.user._id) {
    return res.status(401).end();
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'Not Found' });
    res.status(200).json({ user });
  } catch (error) {
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
