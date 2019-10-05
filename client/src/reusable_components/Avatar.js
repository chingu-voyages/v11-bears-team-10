import React, { useState } from "react";

export default function Avatar({ src, username, className }) {
	const [isLoaded, setLoaded] = useState(false);

	if (!isLoaded && src) {
		// this loads and then caches the image for later use
		const img = new Image();
		img.onload = () => setLoaded(true);
		img.src = src;
	}

	var _className = className ? " " + className : "";

	// display the previously cached image
	if (isLoaded) return <img src={src} alt={username} className={"avatar" + _className} />;

	// or display a placeholder if no image is available yet
	return (
		<div className={"avatar avatar-placeholder" + _className}>{username.substring(0, 2)}</div>
	);
}
