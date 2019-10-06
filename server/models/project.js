const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoListSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  completed: { type: Boolean, default: false },
  assigned_users: [
    {
      username: { type: String, required: true }
    }
  ],
  notified_users: [
    {
      username: { type: String, required: true }
    }
  ]
});

const messageListSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date_create: { type: Date, default: Date.now },
  user: {
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true }
  }
});

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  admin: { type: Schema.Types.ObjectId, required: true },
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  messages: [messageListSchema],
  completed: { type: Boolean, default: false },
  team: [
    {
      username: { type: String, required: true }
    }
  ]
});



const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
