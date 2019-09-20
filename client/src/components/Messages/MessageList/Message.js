import React, { useState } from "react"


function Message({showMessagePortal}) {
  const [messageData] = useState({ title: "Message Title" })

  return (
		<section 
			className="flex-row message-body" 
			data-aos="fade-up"
			onClick={showMessagePortal}
		>
      <div className="flex-col  message-list">
        <span className="flex-row list-head">
					<div className="creator">AV</div>
          <span className="flex-col">
            <h3>{messageData.title}</h3>
            <span className="date">Sept 16 2019 12:00AM</span>
          </span>
        </span>
        {/* <hr /> */}
      </div>
      <div className="close-todo flex-col-centered">x</div>
    </section>
  );
}

export default Message