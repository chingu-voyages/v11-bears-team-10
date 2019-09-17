import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "../Messages/Message";

function MessageBoard() {
  return (
    <>
      <div
        className="add-todo  flex-col-centered"
        onClick={() => console.log("add todo list")}
      >
        <FontAwesomeIcon icon="plus-square" className="plus-todo" />
      </div>
      <Message />
      <Message />
      <Message />
    </>
  );
}

export default MessageBoard;
