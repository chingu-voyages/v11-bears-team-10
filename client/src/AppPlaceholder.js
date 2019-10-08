import React from "react";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer";

export default function AppPlaceholder({ text }) {
	return (
		<>
			<Spinner
				animation="border"
				variant="primary"
				className="mt-auto mb-5 mx-auto big-spinner"
				role="status">
				<span className="sr-only">{text}</span>
			</Spinner>
			<h2 className="mb-auto mt-5 mx-auto text-secondary">{text}</h2>
			<Footer />
		</>
	);
}
