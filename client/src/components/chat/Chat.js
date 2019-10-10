import React, { useState, useEffect } from "react";
import "./Chat.css";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/action_creators/chatAction";

import configSocketIo from "../../redux/action_creators/chatAction";

function Chat({ user, currentProject, messages = [], userList = [] , configSocketIo}) {
  const { projectList } = user;
console.log("chat userlist =", userList)
console.log('messages =', messages)
  const [message, setMessage] = useState("");

  const [chatRoom, setChatRoom] = useState(
    currentProject || { ...projectList[0] }
  );
  useEffect(() => {
  configSocketIo();
  },[projectList]);

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
            {messages[chatRoom.title] &&
              messages[chatRoom.title].map((msg, i) => (
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
            console.log("submit =", message);
            console.log({
              chatRoom: chatRoom.title,
              username: user.username,
              message
            });
            if (!message) return;
            // socket.emit(chatRoom.title, { username: user.username, message });
            // let update = [{ username: user.username, message }];
            // if (messages[chatRoom.title]) {
            //   update = [...messages[chatRoom.title], { username: user.username, message }];
            // }
            // setmessages({ ...messages, [chatRoom.title]: update });
            // setMessage("");
            sendMessage({
              chatRoom: chatRoom.title,
              username: user.username,
              message
            });
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
          {/* {userlist && userList.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentProject: state.project,
    messages: state.chat.messages,
    userList: state.chat.userList || []
  };
};
const mapDistpachToProps = dispatch => ({
  configSocketIo: () => dispatch(configSocketIo())
});

export default connect(mapStateToProps, mapDistpachToProps)(Chat);
