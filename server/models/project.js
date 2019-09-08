import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoListSchema = new Schema({
  name: String,
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  assigne_users: [{ ref: 'User' }],
  notifie_users: [{ ref: 'User' }],
});

const messageBoardSchema = new Schema({
  user: { ref: 'User' },
  title: String,
  text: String,
});

const projectSchema = new Schema({
  project_owner: { ref: 'User' },
  name: String,
  description: String,
  date_create: { type: Date, default: Date.now },
  todos: [todoListSchema],
  message_board: [messageBoardSchema],
  people: [{ ref: 'User' }],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
