import React from "react";
import { Container } from "react-bootstrap";

export default function DarkTransparentContainer(props) {
	return (
		<Container
			as="main"
			id="dashboard"
			className="my-3 my-md-4 py-3 bottom-shadow dark-transparent-container">
			{props.children}
		</Container>
	);
}
