const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secret = process.env.SECRET || 'my secret';

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username or Password is Empty' });
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(401)
        .json({ error: 'Username or Password is invalide' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ error: 'Username or Password is invalide' });
    const playload = {
      id: user._id
    };
    const token = jwt.sign(playload, secret, { expiresIn: 60 * 60 * 24 });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
