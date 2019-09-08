const mongoose = require('mongoose');


const { Schema } = mongoose;

const todoListSchema = new Schema({
  name: String,
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  assigne_users: [Schema.Types.ObjectId],
  notifie_users: [Schema.Types.ObjectId],
});

const messageBoardSchema = new Schema({
  userId: Schema.Types.ObjectId,
  title: String,
  text: String,
});

const projectSchema = new Schema({
  project_owner: Schema.Types.ObjectId,
  name: String,
  description: String,
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  message_board: [messageBoardSchema],
  people: [Schema.Types.ObjectId],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
