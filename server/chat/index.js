const { ChatUser, MessageChat } = require("../models/chat");

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", function(socket) {
    socket.on("create", function(projectList) {
      projectList.forEach(project => {
        socket.on(project, async function(msg) {
          try {
            if (socket.id === msg.msgID) return;
            const message = await MessageChat.create(msg);
            await message.save();
            socket.id = msg.msgID
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
