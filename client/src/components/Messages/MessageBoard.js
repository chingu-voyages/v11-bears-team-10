import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "./MessageList/MessageList";
import Portal from '../../HOC/portal/portal'
import AddMessage from './Message'
import AddMessageList from './AddMessageList'

const MessagePortal = Portal(AddMessage)

function MessageBoard() {
	const [showModal, setShowModal] = useState(false);
	const [showPortal, setShowPortal] = useState(false);

	const openForm = () => setShowModal(true);
	const closeModal = () => setShowModal(false);
	const displayPortal = () => setShowPortal(true);
  const hidePortal = () => setShowPortal(false);
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
      <Message showMessagePortal={displayPortal}  />
    </>
  );
}

export default MessageBoard;
