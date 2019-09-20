import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getErrorMessage } from "../_helpers";

export default function ErrorPage({ error, resetError }) {
	return (
		<Row>
			<Col xs={12} className="text-center my-5 pt-5 error-info">
				{getErrorMessage(error)}
			</Col>
			{resetError && (
				<Button variant="outline-secondary" className="m-auto" onClick={resetError}>
					<FontAwesomeIcon icon="redo-alt" />
				</Button>
			)}
		</Row>
	);
}
