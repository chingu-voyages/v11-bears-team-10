import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { connect } from "react-redux";
import {
  sendMessage,
  resetCounter
} from "../../redux/action_creators/chatAction";

function Chat({
  user,
  messages = [],
  userList = [],
  counter,
  dispatch
}) {
  const { projectList } = user;
  const [message, setMessage] = useState("");

  const [chatRoom, setChatRoom] = useState(projectList[0].title);
  const messagesRef = useRef();
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <main className="chat-main-container">
      <div className="chat-container">
        <div className="chat-left">
          <div className="left-title">Rooms</div>
          <div className="list-wrapper">
            <ul>
              {projectList.map(project => (
                <li
                  key={project._id}
                  id={project._id}
                  onClick={() => {
                    setChatRoom(project.title);
                    dispatch(resetCounter(chatRoom));
                  }}
                >
                  <span># {project.title}</span>
                  {project.title !== chatRoom &&
                    counter[project.title] !== 0 && (
                      <span className='msg-counter'>{counter[project.title]}</span>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="chat-middle">
          <div className="chat-title">{chatRoom}</div>
          <div className="chat-display" ref={messagesRef}>
            <ul>
              {messages[chatRoom] &&
                messages[chatRoom].map((msg, i) => (
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
              sendMessage({
                chatRoom: chatRoom,
                username: user.username,
                message
              });
              setMessage("");
              dispatch(resetCounter(chatRoom));
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
            <input className="btn-chat-send" type="submit" value="" />
          </form>
        </div>
        <div className="chat-right">
          <div className="right-title">Online...!</div>
          <div className="list-wrapper">
            <ul>
              {userList.map((user, i) => (
                <li key={i}>{user.username}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.chat.messages,
    userList: state.chat.userList || [],
    counter: state.chat.newMessagesCounter || {}
  };
};

export default connect(mapStateToProps)(Chat);
