import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux'

import Message from "./MessageList/MessageList";
import Portal from '../../HOC/portal/portal'
import AddMessage from './Message'
import AddMessageList from './AddMessageList'

const MessagePortal = Portal(AddMessage)

function MessageBoard({messages}) {
	const [showModal, setShowModal] = useState(false);
	const [showPortal, setShowPortal] = useState(false);

	const openForm = () => setShowModal(true);
	const closeModal = () => setShowModal(false);
	const displayPortal = () => setShowPortal(true);
  const hidePortal = () => setShowPortal(false);

  const messageList = messages.map(message => <Message key={message._id} message={message} showTodoPortal={displayPortal} />)

  return (
    <>
      <div
        className="add-todo  flex-col-centered"
        onClick={openForm}
      >
        <FontAwesomeIcon icon="plus-square" className="plus-todo" />
      </div>
			<AddMessageList showForm={showModal} handleCloseForm={closeModal} />
			<MessagePortal showForm={showPortal} setOpen={hidePortal} />
      { messageList }
    </>
  );
}

const mapStateToProps = state =>{
  return{
    messages : [...state.project.message_board]
  }
}

export default connect(mapStateToProps)(MessageBoard);

