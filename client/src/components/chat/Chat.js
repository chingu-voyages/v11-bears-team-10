import React, { useState } from 'react'
import openSocket from 'socket.io-client';
import './Chat.css'
import { connect } from "react-redux"

const socket = openSocket(`127.0.0.1:8000`);

function Chat({user, currentProject}) {
  const { projectList } = user
  const [ message, setMessage ] = useState('');
  const [ messageList, setMessageList ] = useState([]);
  const [ chatRoom, setChatRoom ] = useState(currentProject || {});
  socket.on('chat message', function(msg){
    setMessageList([...messageList, msg])
  });
  return (
    <div className="chat-container">
      <div className="chat-left">
      <ul>{
          projectList.map((project) =><li key={project._id} id={project._id} onClick={(e) => {
            setChatRoom(projectList.find(prj => prj._id === e.target.id))
          }
          } >{project.title}</li>)
        }</ul>
      </div>
      <div className="chat-middle">
        <div>{chatRoom.title}</div>
        <div className="chat-display"><ul>{
          messageList.map((message, i) =><li key={i}>{message}</li>)
        }</ul></div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if(!message) return
          socket.emit('chat message', message);
          setMessage('')
        }
        } >
          <input className="input-chat-message" type="text" value={message} onChange={(e) => {
            setMessage(e.target.value)
          }
          } />
          <input className="btn-chat-send" type="submit" value="Send"/>
        </form>
      </div>
      <div className="chat-right"></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    currentProject: state.project 
  }
}


export default connect(mapStateToProps)(Chat)