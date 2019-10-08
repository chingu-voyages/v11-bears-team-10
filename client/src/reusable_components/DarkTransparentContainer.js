import React from "react";
import { Container } from "react-bootstrap";

export default function DarkTransparentContainer({ className, children }) {
	return (
		<Container
			as="main"
			id="dashboard"
			className={
				"my-3 my-md-4 py-3 bottom-shadow dark-transparent-container" +
				(className ? " " + className : "")
			}>
			{children}
		</Container>
	);
}
