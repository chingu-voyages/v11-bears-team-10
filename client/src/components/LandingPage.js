import React from "react";

export default function LandingPage() {
	return (
		<main
			data-aos="zoom-in"
			className="hero-message mt-5 ml-md-5 ml-auto mb-auto mr-auto text-center">
			<h1>{process.env.REACT_APP_NAME}</h1>
			<small className="text-muted">manage projects better</small>
		</main>
	);
}
