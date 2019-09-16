const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoListSchema = new Schema({
  title: {type: String, required},
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  assigne_users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  notifie_users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const messageBoardSchema = new Schema({
  title: String,
  text: String,
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

const projectSchema = new Schema({
  title: {type: String, required},
  description: String,
  admin : {type: Schema.Types.ObjectId, ref: 'User'},
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  message_board: [messageBoardSchema],
  team: [{type: Schema.Types.ObjectId, ref: 'User'}],
  isFinished: {type: Boolean, default: false}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
