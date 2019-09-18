const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const todoListSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date_create: { type: Date, default: Date.now },
  date_due: Date,
  isClosed: { type: Boolean, default: false },
  assigned_users: [
    {
      username: { type: String, require: true }
    }
  ],
  notified_users: [
    {
      username: { type: String, require: true }
    }
  ]
});

const messageBoardSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date_create: { type: Date, default: Date.now },
  user: {
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
  isClosed: { type: Boolean, default: false },
  team: [
    {
      username: { type: String, require: true }
    }
  ]
});

// todoListSchema.pre('save', function(next) {
//   this.assigned_users = convertUserId(this.assigned_users);
//   this.notified_users = convertUserId(this.notified_users);
//   next();
// });

// messageBoardSchema.pre('save', function(next) {
//   this.user = convertUserId([this.user]);
//   next();
// });

// projectSchema.pre('save', function(next) {
//   this.team = convertUserId(this.team);
//   next();
// });

// function convertUserId(user) {
//   return user.map(user => {
//     user._id = ObjectId(user._id);
//     return user;
//   });
// }

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
