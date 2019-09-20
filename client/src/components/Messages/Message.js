import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";

function Message({ showForm, setOpen }) {
  const [messageData] = useState({
    title: "A new message",
  });

  const [strike, setStrike] = useState([false, 0]);

  Message.handleClickOutside = () => setOpen();

  return showForm ? (
    <>
      <div className="flex-col todos-portal">
        <div className="portal-wrapper flex-col">
          <h3>{messageData.title}</h3>
          <hr />
          <span>
            {" "}
            <strong>Last Update:</strong> Sept 16 2019 12:00AM{" "}
          </span>
        </div>
      </div>
    </>
  ) : null;
}

const clickOutsideConfig = {
  handleClickOutside: () => Message.handleClickOutside
};

export default onClickOutside(Message, clickOutsideConfig);