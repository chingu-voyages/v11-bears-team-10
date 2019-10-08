import React, { useState } from 'react'
import openSocket from 'socket.io-client';
import './Chat.css'

const socket = openSocket(`localhost:8000`);

export default function Chat() {
  const [ message, setMessage ] = useState('');
  const [ messageList, setMessageList ] = useState([]);
  socket.on('chat message', function(msg){
    setMessageList([...messageList, msg])
    // $('#messages').append($('<li>').text(msg));
    // window.scrollTo(0, document.body.scrollHeight);
  });
  return (
    <div className="chat-container">
      <div className="chat-left"></div>
      <div className="chat-middle">
        <div className="chat-display"><ul>{
          messageList.map((message, i) =><li key={i}>{message}</li>)
        }</ul></div>
        <form onSubmit={(e) => {
          e.preventDefault();
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
