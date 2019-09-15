const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  assigned_users: [Schema.Types.ObjectId],
  notified_users: [Schema.Types.ObjectId]
});

const messageBoardSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, required: true}
});

const projectSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  admin :{type: Schema.Types.ObjectId, required: true},
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  message_board: [messageBoardSchema],
  team: [Schema.Types.ObjectId],
  isFinished: {type: Boolean, default: false}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
