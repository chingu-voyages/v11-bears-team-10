import React from "react";
import getErrorMessage from "./getErrorMessage";

export default function ErrorPage({ error }) {
	return (
		<h1 id="error-page-message" className="m-auto p-4 text-light rounded-lg">
			{getErrorMessage(error)}
		</h1>
	);
}
