const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },

  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    bcrypt: true
  },

  firstName: {
    type: String,
    trim: true
  },

  lastName: {
    type: String,
    trim: true
  },

  middleName: {
    type: String,
    trim: true
  },
  projectList: [Schema.Types.ObjectId]
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified()) return next();
  bcrypt.hash(user.password, 12, (err, hashedPassword) => {
    if (err) return next(err);
    user.password = hashedPassword;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
