const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userChatSchema = new Schema({
  username: String
});

const messageSchema = new Schema({
  message: String,
  username: String,
  date: { type: Date, default: Date.now }
});

const ChatUser = mongoose.model("ChatUser", userChatSchema);
const MessageChat = mongoose.model("MessageChat", messageSchema);

module.exports = {
  ChatUser,
  MessageChat
};
