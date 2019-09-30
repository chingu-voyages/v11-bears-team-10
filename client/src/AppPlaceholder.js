import React from "react";
import { Spinner } from "react-bootstrap";

export default function AppPlaceholder() {
	return (
		<>
			<Spinner
				animation="border"
				variant="primary"
				className="mt-auto mb-5 mx-auto  big-spinner"
				role="status">
				<span className="sr-only">Authenticating...</span>
			</Spinner>
			<h2 className="mb-auto mt-5 mx-auto text-secondary">Authenticating ...</h2>
		</>
	);
}
