import React from "react";
import { Spinner } from "react-bootstrap";

export default function AppPlaceholder() {
	return (
		<div className="h-100vh d-flex flex-column">
			<Spinner
				animation="border"
				variant="primary"
				className="m-auto big-spinner"
				role="status">
				<span className="sr-only">Authenticating...</span>
			</Spinner>
			<h2 className="m-auto text-secondary">Authenticating ...</h2>
		</div>
	);
}
