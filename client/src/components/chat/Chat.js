import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import "./Chat.css";
import { connect } from "react-redux";

const socket = openSocket(`127.0.0.1:8000`);

function Chat({ user, currentProject }) {
  const { projectList } = user;

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState({});
  const [chatRoom, setChatRoom] = useState(
    currentProject || { ...projectList[0] }
  );
  const [users, setUsers] = useState({});

  projectList.forEach(prj => {
    socket.on(prj.title, function(msg) {
      // console.log('prj title =', prj.title)
      let update = [msg];
      if (allMessages[prj.title]) {
        update = [...allMessages[prj.title], msg];
      }
      setAllMessages({ ...allMessages, [prj.title]: update });
    });
  });
  socket.on("users", function(userlist) {
    console.log("userlist =", userlist)
    setUsers({ ...userlist });
  });

  useEffect(() => {
    console.log("useeffect emit create");
    const projectTitles = projectList.map(prj => prj.title);
    socket.emit("create", projectTitles);
    socket.emit("login", user.username);
  }, [projectList, user]);

  return (
    <div className="chat-container">
      <div className="chat-left">
        <ul>
          {projectList.map(project => (
            <li
              key={project._id}
              id={project._id}
              onClick={e => {
                const project = projectList.find(
                  prj => prj._id === e.target.id
                );
                setChatRoom(project);
                console.log("chatRoom.title =", project.title);
              }}
            >
              {project.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-middle">
        <div className="chat-title">{chatRoom.title}</div>
        <div className="chat-display">
          <ul>
            {allMessages[chatRoom.title] &&
              allMessages[chatRoom.title].map((msg, i) => (
                <li key={i}>
                  {msg.username}: {msg.message}
                </li>
              ))}
          </ul>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!message) return;
            socket.emit(chatRoom.title, { username: user.username, message });
            setMessage("");
          }}
        >
          <input
            className="input-chat-message"
            type="text"
            value={message}
            onChange={e => {
              setMessage(e.target.value);
            }}
          />
          <input className="btn-chat-send" type="submit" value="Send" />
        </form>
      </div>
      <div className="chat-right">
        <ul>
          {
            Object.entries(users).map(([key, username]) => (
              <li key={key}>
                {username}
              </li>
    
            ))}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentProject: state.project
  };
};

export default connect(mapStateToProps)(Chat);
