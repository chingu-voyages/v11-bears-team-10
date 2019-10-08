import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Avatar({
	src,
	username,
	className,
	pullRight,
	pullLeft,
	sm,
	withBorder,
	withTooltip
}) {
	const [isLoaded, setLoaded] = useState(false);

	if (!isLoaded && src) {
		// this loads and then caches the image for later use
		const img = new Image();
		img.onload = () => setLoaded(true);
		img.src = src;
	}

	var _className = className ? " " + className : "";
	if (pullLeft) _className += " pull-left";
	if (pullRight) _className += " pull-right";
	if (withBorder) _className += " border border-light";

	var baseClass = sm ? "avatar-sm" : "avatar";

	// display the previously cached image
	if (isLoaded) return <img src={src} alt={username} className={baseClass + _className} />;

	// or display a placeholder if no image is available yet

	const _div = (
		<div className={baseClass + " avatar-placeholder" + _className}>
			{username.substring(0, 2)}
		</div>
	);

	if (!withTooltip) return _div;

	return (
		<OverlayTrigger overlay={<Tooltip id="tooltip-AVATAR">{username}</Tooltip>}>
			{_div}
		</OverlayTrigger>
	);
}
