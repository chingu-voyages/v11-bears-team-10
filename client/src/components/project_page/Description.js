import React from "react";

export default function Description({ description, title }) {
	var className = "section-paragraph px-2 pt-4";
	if (!description) className += " text-muted";
	return (
		<>
			<h3 className="text-center">{title}</h3>
			<hr className="w-50" />
			<p className={className}>{description || "this project needs a description ."}</p>
		</>
	);
}
