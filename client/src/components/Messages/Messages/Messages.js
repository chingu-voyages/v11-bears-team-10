import React from "react";
import {connect} from 'react-redux'

import MessageItem from '../MessageItem/MessageItem'


function Messages({messages}) {
  const messageList = messages.map(message => <MessageItem key={message._id} message={message}  />)

  return (
    <>
      { messageList }
    </>
  );
}

const mapStateToProps = state =>{
  return{
    messages : [...state.project.messages]
  }
}

export default connect(mapStateToProps)(Messages);

