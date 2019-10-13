const { ChatUser, MessageChat } = require("../models/chat");

module.exports = server => {
  // var server = require("http").Server(app);
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    socket.on("create", function(projectList) {
      projectList.forEach(project => {
        socket.on(project, async function(msg) {
          try {
            const findDouble = await MessageChat.findOne({ msgID: msg.msgID });
            if (findDouble) return;
            const message = await MessageChat.create(msg);
            await message.save();
            io.emit(project, message);
          } catch (error) {
            console.error(error);
          }
        });
      });
    });

    socket.on("isTyping", function(username) {
      io.emit("isTyping", username);
    });

    socket.on("disconnect", async function() {
      console.log("chat user disconnect =", socket.username);
      try {
        if (socket.username) {
          await ChatUser.findOneAndDelete({ username: socket.username });
          const users = await ChatUser.find();
          io.emit("users", users);
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("login", async function(username) {
      console.log("chat user login =", username);
      try {
        socket.username = username;
        const finduser = await ChatUser.findOne({ username });
        if (!finduser) {
          const user = await ChatUser.create({ username });
          await user.save();
        }
        const users = await ChatUser.find();
        io.emit("users", users);
      } catch (error) {
        console.error(error);
      }
    });
    socket.on("users", async function() {
      try {
        const users = await ChatUser.find();
        io.emit("users", users);
      } catch (error) {
        console.error(error);
      }
    });
  });
};
