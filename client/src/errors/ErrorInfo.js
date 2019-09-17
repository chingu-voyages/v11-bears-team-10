import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HTTP_ERRORS from "./HTTP_ERRORS";

export default function ErrorInfo({ requestTimeout, statusCode, message, resetError }) {
	return (
		<Row>
			<Col xs={12} className="text-center my-5 pt-5 error-info">
				{statusCode && statusCode + " | "}
				{message ||
					(requestTimeout && "request timeout . try refreshing the page") ||
					HTTP_ERRORS[statusCode] ||
					"something went wrong try refreshing the page"}
			</Col>
			{resetError && (
				<Button variant="outline-secondary" className="m-auto" onClick={resetError}>
					<FontAwesomeIcon icon="redo-alt" />
				</Button>
			)}
		</Row>
	);
}
