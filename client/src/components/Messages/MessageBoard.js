import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "./MessageList/Message";
import Portal from '../../HOC/portal/portal'
import AddMessage from './Message'

const MessagePortal = Portal(AddMessage)

function MessageBoard() {
	const [showPortal, setShowPortal] = useState(false);

	const displayPortal = () => setShowPortal(true);
  const hidePortal = () => setShowPortal(false);
  return (
    <>
      <div
        className="add-todo  flex-col-centered"
        onClick={() => console.log("add todo list")}
      >
        <FontAwesomeIcon icon="plus-square" className="plus-todo" />
      </div>
			<MessagePortal showForm={showPortal} setOpen={hidePortal} />
      <Message showMessagePortal={displayPortal}  />
      {/* <Message showMessagePortal={displayPortal} />
      <Message showMessagePortal={displayPortal} /> */}
    </>
  );
}

export default MessageBoard;
