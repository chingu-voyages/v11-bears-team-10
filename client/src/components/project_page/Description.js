import React from "react";

export default function Description(props) {
	return (
		<>
			<h1 className="section-title text-center">{props.title}</h1>
			<hr className="w-100" />
			<p className="section-paragraph px-2">{props.description}</p>
		</>
	);
}
