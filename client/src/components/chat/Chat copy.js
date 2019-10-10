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
  const [users, setUsers] = useState([]);

  let buffer = {}

  const updateMessages = () => {
    setAllMessages(buffer)
  }
  

  useEffect(() => {
   const name = () => {
    projectList.forEach(prj => {
      socket.on(prj.title, function(msg) {
        let update = [msg];
        if (buffer[prj.title]) {
          update = [...buffer[prj.title], msg];
        }
        buffer = ({ ...buffer, [prj.title]: update });
        updateMessages()
      });
    });
   }
   name()
  },[]);

  useEffect(() => {
    console.log("useeffect emit create");
    const projectTitles = projectList.map(prj => prj.title);
    socket.emit("create", projectTitles);
    socket.emit("login", user.username);
    // setListener();
    socket.on("users", function(userlist) {
      console.log("on user");
      setUsers([...userlist]);
    });
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
                  <div>
                    <span className="chat-msg-username">{msg.username}:</span>
                    <span className="chat-msg-date">
                      {new Date(msg.date).toLocaleString()}
                    </span>
                  </div>
                  <p>{msg.message}</p>
                </li>
              ))}
          </ul>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!message) return;
            socket.emit(chatRoom.title, { username: user.username, message });
            let update = [{ username: user.username, message }];
            if (allMessages[chatRoom.title]) {
              update = [...allMessages[chatRoom.title], { username: user.username, message }];
            }
            setAllMessages({ ...allMessages, [chatRoom.title]: update });
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
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
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
