import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getErrorMessage from "./getErrorMessage";

export default function ErrorPage({ error, resetError }) {
	return (
		<>
			<h1 className="m-auto text-muted">{getErrorMessage(error)}</h1>
			{resetError && (
				<Button variant="outline-secondary" className="m-auto" onClick={resetError}>
					<FontAwesomeIcon icon="redo-alt" />
				</Button>
			)}
		</>
	);
}
