const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },

  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    bcrypt: true,
  },

  firstName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
  },

  middleName: {
    type: String,
    trim: true,
  },
  projectList: [Schema.Types.ObjectId],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
