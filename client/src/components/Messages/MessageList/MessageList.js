import React from "react";

function Message({ showMessagePortal, message }) {
	return (
		<section
			className="d-flex flex-row message-body"
			data-aos="fade-up"
			onClick={showMessagePortal}>
			<div className="d-flex flex-col  message-list">
				<span className="d-flex flex-row list-head">
					<div className="creator">AV</div>
					<span className="d-flex flex-col">
						<h3>{message.title}</h3>
						<span className="date">{message.date_create}</span>
					</span>
				</span>
				{/* <hr /> */}
			</div>
			<div className="close-todo d-flex flex-col-centered">X</div>
		</section>
	);
}

export default Message;
