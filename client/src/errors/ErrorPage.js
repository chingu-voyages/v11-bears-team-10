import React from "react";
import getErrorMessage from "./getErrorMessage";

export default function ErrorPage({ error }) {
	return (
		<div className="m-auto text-center text-light">
			<h1 id="error-page-message" className="p-3 my-0 mx-2 rounded-lg">
				{getErrorMessage(error)}
			</h1>
		</div>
	);
}
