module.exports = app => {
  var server = require("http").Server(app);
  var io = require("socket.io")(server);
  server.listen(8000);
  // WARNING: app.listen(80) will NOT work here!

  io.on("connection", function(socket) {
    socket.on("create", function(projectList) {
      projectList.forEach(project => {
        socket.on(project, function(msg) {
          console.log("project room=", project, msg);
          io.emit(project, msg);
        });
      });
    });
    socket.on('login', function(username){
      
      socket.userlist = socket.userlist ? {...socket.userlist, [username]:username} : {[username]:username}
      io.emit('users', socket.userlist)
    })
    socket.on('users', function(){
      io.emit('users', socket.userlist)
    })
  });
};
