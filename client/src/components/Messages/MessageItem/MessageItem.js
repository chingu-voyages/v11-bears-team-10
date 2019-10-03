import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MessageItem({ message }) {
  const deleteMessage = () => {
    console.log("delete this message");
  };

  return (
    <section
      className="flex-col todo-item-body message-item-body"
    >
      <div className="item-top flex-row">
        <div id="initials" className="flex-col-centered">
          {"AO"}
        </div>
        <div onClick={deleteMessage}>
          <FontAwesomeIcon icon="times-circle" className="close-todo-item" />
        </div>
      </div>
      <hr />
      <div className="item-bottom">
        <div>
          <h4>{message.title}</h4>
          <span className="date">{message.date_create}</span>
        </div>
      </div>
    </section>
  );
}

export default MessageItem;
