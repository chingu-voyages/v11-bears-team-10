import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
	if (props.redirectIf) return <Redirect to={props.redirectTo} />;

	return <Route {...props} />;
}
