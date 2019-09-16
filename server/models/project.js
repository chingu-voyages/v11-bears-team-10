const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  assigned_users: [
    {
      userId: { type: Schema.Types.ObjectId, required: true },
      username: { type: String, require: true }
    }
  ],
  notified_users: [
    {
      userId: { type: Schema.Types.ObjectId, required: true },
      username: { type: String, require: true }
    }
  ]
});

const messageBoardSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date_create: { type: Date, default: Date.now },
  user: {
    userId: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, require: true }
  }
});

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  admin: { type: Schema.Types.ObjectId, required: true },
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  message_board: [messageBoardSchema],
  isFinished: { type: Boolean, default: false },
  team: [{
    userId: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, require: true }
  }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
