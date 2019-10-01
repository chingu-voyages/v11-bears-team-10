import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Avatar({ src, alt }) {
	if (src) return <img alt={alt} src={src} className="avatar rounded-circle mx-2" />;
	return <FontAwesomeIcon icon="user-circle" className="avatar-placeholder mx-2" />;
}
