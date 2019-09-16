const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  assigne_users: [Schema.Types.ObjectId],
  notifie_users: [Schema.Types.ObjectId]
});

const messageBoardSchema = new Schema({
  title: String,
  text: String,
  userId: Schema.Types.ObjectId
});

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  admin: Schema.Types.ObjectId,
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  message_board: [messageBoardSchema],
  team: [Schema.Types.ObjectId],
  isFinished: { type: Boolean, default: false }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
