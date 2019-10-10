const { ChatUser, MessageChat } = require("../models/chat");

module.exports = app => {
  var server = require("http").Server(app);
  var io = require("socket.io")(server);
  server.listen(8000);
  // WARNING: app.listen(80) will NOT work here!

  io.on("connection", function(socket) {
    socket.on("create", function(projectList) {
      console.log("projcetlis =", projectList)
      projectList.forEach(project => {
        socket.on(project, async function(msg) {
          console.log(project, msg)
          try {
            const message = await MessageChat.create(msg);
            await message.save();
            io.emit(project, message);
          } catch (error) {
            console.error(error);
          }
        });
      });
    });

    socket.on('disconnect', async() => {
     try {
      if(socket.username){
        await ChatUser.findOneAndDelete({username: socket.username})
        const users = await ChatUser.find();
        io.emit("users", users);
      }
      console.log("disconnected", socket.username)
     } catch (error) {
       console.error(error)
     }
    })

    socket.on("login", async function(username) {
      try {
        socket.username = username;
        console.log('user login =', username)
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
