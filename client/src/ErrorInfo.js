import React from "react";
import { Col } from "react-bootstrap";

export default function ErrorInfo({ message, statusCode }) {
	return (
		<Col xs={12} className="text-center mt-5 pt-5 error-info">
			{statusCode && statusCode + " | "}
			{message}
		</Col>
	);
}

