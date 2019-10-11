const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userChatSchema = new Schema({
  username: String
});

const messageSchema = new Schema({
  room: mongoose.Types.ObjectId,
  message: String,
  username: String,
  msgID: String,
  date: { type: Date, default: Date.now }
}, { capped: { size: 10240, max: 1000 }});

const ChatUser = mongoose.model("ChatUser", userChatSchema);
const MessageChat = mongoose.model("MessageChat", messageSchema);

module.exports = {
  ChatUser,
  MessageChat
};
